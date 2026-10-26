import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  AppRegistry,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Live Vercel production deployment
const SERVER_URL = 'https://list-it-rust.vercel.app';

const WebView = Platform.OS !== 'web' ? require('react-native-webview').WebView : null;

export default function App() {
  const [error, setError] = useState(false);
  const [key, setKey] = useState(1);

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.replace('http://localhost:5173');
    }
  }, []);

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#7C3AED" />
        <Text style={styles.loadingText}>Opening List It (http://localhost:5173)...</Text>
      </View>
    );
  }

  const handleRetry = () => {
    setError(false);
    setKey((prev) => prev + 1);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor="#EDE9FE" translucent={false} />
        <View style={styles.topStrip} />
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Cannot Connect to List It</Text>
            <Text style={styles.errorText}>
              Please ensure your phone and computer are on the same Wi-Fi network, and that Vite is running.
            </Text>
            <Text style={styles.errorUrl}>{SERVER_URL}</Text>
            <TouchableOpacity style={styles.button} onPress={handleRetry}>
              <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.webviewWrapper}>
            <WebView
              key={key}
              source={{ uri: SERVER_URL }}
              style={styles.webview}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              mediaPlaybackRequiresUserAction={false}
              allowsInlineMediaPlayback={true}
              mixedContentMode="always"
              originWhitelist={['*']}
              startInLoadingState={true}
              renderLoading={() => (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#7C3AED" />
                  <Text style={styles.loadingText}>Opening List It...</Text>
                </View>
              )}
              onError={() => setError(true)}
            />
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE9FE',
  },
  topStrip: {
    height: 18,
    backgroundColor: '#EDE9FE',
  },
  webviewWrapper: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E4DCFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#18181B',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#E4DCFA',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#18181B',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#52525B',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  errorUrl: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7C3AED',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#18181B',
  },
  button: {
    backgroundColor: '#FEF08A',
    borderWidth: 2,
    borderColor: '#18181B',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#18181B',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#18181B',
  },
});

AppRegistry.registerComponent('main', () => App);
