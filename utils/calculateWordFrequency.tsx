export const calculateWordFrequency = (text: string) => {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const frequencyMap: Record<string, number> = {};

  words.forEach((word) => {
    frequencyMap[word] = (frequencyMap[word] || 0) + 1;
  });

  return frequencyMap;
};
