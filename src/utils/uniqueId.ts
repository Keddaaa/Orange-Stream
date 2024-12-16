// Maintain a map of counters for different sections and types
const counters = new Map<string, Map<string, number>>();

export function generateUniqueId(section: string, type: string): string {
  if (!counters.has(section)) {
    counters.set(section, new Map());
  }
  
  const sectionCounters = counters.get(section)!;
  const currentCount = (sectionCounters.get(type) || 0) + 1;
  sectionCounters.set(type, currentCount);
  
  return `${section}-${type}-${currentCount}`;
}

export function resetSectionCounters(section: string): void {
  counters.delete(section);
}

export function resetAllCounters(): void {
  counters.clear();
}