/**
 * Estimates reading time in minutes based on text content.
 * @param text The text to analyze
 * @param wordsPerMinute Average reading speed (default 200)
 * @returns Estimated reading time in minutes (minimum 1)
 */
export const calculateReadingTime = (text: string, wordsPerMinute: number = 200): number => {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes);
};
