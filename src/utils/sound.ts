// Audio synthesizer and haptic feedback utility
// Built with native Web Audio API — optimized for mobile WebViews (Expo Go / Android / iOS) & Desktop
// Features auto-unlock on user gesture, async context resuming, and speaker-calibrated harmonic synthesis.

class SoundFX {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private hapticsEnabled: boolean = true;
  private isUnlocked: boolean = false;

  constructor() {
    this.initMobileAudioUnlock();
  }

  // Mobile WebViews and browsers require an explicit user gesture to unlock the audio pipeline.
  // We attach global one-time gesture listeners to warm up and resume the audio hardware session.
  private initMobileAudioUnlock() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const unlock = () => {
      try {
        const ctx = this.getOrCreateContext();
        if (ctx) {
          if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
          }
          // Play a silent 1-sample buffer to unlock the mobile hardware audio session
          const buffer = ctx.createBuffer(1, 1, 22050);
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          source.connect(ctx.destination);
          source.start(0);

          if (ctx.state === 'running') {
            this.isUnlocked = true;
          }
        }
      } catch {
        // Silently catch unlock issues
      }

      if (this.isUnlocked) {
        ['touchstart', 'touchend', 'pointerdown', 'mousedown', 'click'].forEach((event) => {
          document.removeEventListener(event, unlock, true);
        });
      }
    };

    ['touchstart', 'touchend', 'pointerdown', 'mousedown', 'click'].forEach((event) => {
      document.addEventListener(event, unlock, { capture: true, passive: true });
    });
  }

  public setEnabled(sound: boolean, haptics: boolean) {
    this.soundEnabled = sound;
    this.hapticsEnabled = haptics;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  private getOrCreateContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  // Pre-warms the audio context on pointer/touch down for 0ms latency click response
  public warmUp() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getOrCreateContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    } catch {
      // Ignore
    }
  }

  // Safe executor that guarantees the AudioContext is resumed and running before scheduling nodes.
  // This solves the mobile bug where ctx.currentTime is frozen at 0 while suspended.
  private async executeAudio(builder: (ctx: AudioContext, now: number) => void) {
    if (!this.soundEnabled) return;
    const ctx = this.getOrCreateContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      const now = ctx.currentTime;
      builder(ctx, now);
    } catch {
      // Fallback or catch node creation / scheduling errors gracefully
    }
  }

  public triggerHaptic(pattern: number | number[] = 15) {
    if (!this.hapticsEnabled) return;
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch {
      // Ignore vibration errors
    }
  }

  // Tactile, crisp woodblock/bubble pop for buttons and navigation items
  // Calibrated frequency and gain specifically for mobile phone speakers
  public playClick() {
    this.triggerHaptic(10);

    this.executeAudio((ctx, now) => {
      // Transient attack pop (cuts through tiny phone speaker grilles)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      // Pitch drop creates that signature crisp "click" feel
      osc.frequency.setValueAtTime(820, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);

      gain.gain.setValueAtTime(0.32, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);

      // Subtle high click body for snappy tactile feedback
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'sine';
      clickOsc.frequency.setValueAtTime(1400, now);
      clickOsc.frequency.exponentialRampToValueAtTime(600, now + 0.02);

      clickGain.gain.setValueAtTime(0.18, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);

      clickOsc.start(now);
      clickOsc.stop(now + 0.02);
    });
  }

  // Joyful two-tone ascending chime when completing an item (E5 -> B5)
  public playCheck() {
    this.triggerHaptic([15, 30, 20]);

    this.executeAudio((ctx, now) => {
      const tones = [
        { freq: 659.25, timeOffset: 0, duration: 0.14, gain: 0.28 },     // E5
        { freq: 987.77, timeOffset: 0.05, duration: 0.20, gain: 0.32 },    // B5
      ];

      tones.forEach(({ freq, timeOffset, duration, gain }) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + timeOffset);

        gainNode.gain.setValueAtTime(gain, now + timeOffset);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + duration);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + duration);
      });
    });
  }

  // Soft low pop when unchecking an item
  public playUncheck() {
    this.triggerHaptic(12);

    this.executeAudio((ctx, now) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.065);

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.065);
    });
  }

  // Soft swoosh for delete/archive
  public playSwoosh() {
    this.triggerHaptic([20, 20]);

    this.executeAudio((ctx, now) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.09);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    });
  }

  // Celebratory fanfare when an entire list reaches 100% (C major arpeggio)
  public playCelebration() {
    this.triggerHaptic([30, 40, 30, 40, 50]);

    this.executeAudio((ctx, now) => {
      const chord = [
        { freq: 523.25, timeOffset: 0, duration: 0.3 },      // C5
        { freq: 659.25, timeOffset: 0.06, duration: 0.3 },   // E5
        { freq: 783.99, timeOffset: 0.12, duration: 0.32 },  // G5
        { freq: 1046.50, timeOffset: 0.18, duration: 0.45 }, // C6
      ];

      chord.forEach(({ freq, timeOffset, duration }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + timeOffset);

        gain.gain.setValueAtTime(0.26, now + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + duration);
      });
    });
  }
}

export const sound = new SoundFX();
