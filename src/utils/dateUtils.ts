export function formatDateFriendly(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const target = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 1 && diffDays <= 6) {
      return target.toLocaleDateString('en-US', { weekday: 'short' });
    }

    return target.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

export function isOverdue(dateStr?: string, isCompleted: boolean = false): boolean {
  if (!dateStr || isCompleted) return false;
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const parts = dateStr.split('-');
    if (parts.length !== 3) return false;
    const target = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    target.setHours(0, 0, 0, 0);

    return target.getTime() < today.getTime();
  } catch {
    return false;
  }
}

export function isDueToday(dateStr?: string): boolean {
  if (!dateStr) return false;
  const todayStr = new Date().toISOString().split('T')[0];
  return dateStr === todayStr;
}

export function getMonthMatrix(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay(); // 0 is Sunday
  const totalDays = new Date(year, month + 1, 0).getDate();
  
  const matrix: Array<Array<{ day: number; dateStr: string; isCurrentMonth: boolean }>> = [];
  let currentWeek: Array<{ day: number; dateStr: string; isCurrentMonth: boolean }> = [];

  // Previous month trailing days
  const prevMonthTotalDays = new Date(year, month, 0).getDate();
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthTotalDays - i;
    const m = month === 0 ? 12 : month;
    const y = month === 0 ? year - 1 : year;
    const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    currentWeek.push({ day: d, dateStr, isCurrentMonth: false });
  }

  // Current month days
  for (let day = 1; day <= totalDays; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    currentWeek.push({ day, dateStr, isCurrentMonth: true });
    if (currentWeek.length === 7) {
      matrix.push(currentWeek);
      currentWeek = [];
    }
  }

  // Next month leading days
  if (currentWeek.length > 0) {
    let nextDay = 1;
    while (currentWeek.length < 7) {
      const m = month + 2 > 12 ? 1 : month + 2;
      const y = month + 2 > 12 ? year + 1 : year;
      const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(nextDay).padStart(2, '0')}`;
      currentWeek.push({ day: nextDay, dateStr, isCurrentMonth: false });
      nextDay++;
    }
    matrix.push(currentWeek);
  }

  return matrix;
}
