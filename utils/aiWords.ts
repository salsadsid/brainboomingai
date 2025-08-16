export default function getRandomAIWord(): string {
  const words = [
    "AI",
    "artificial intelligence",
    "machine learning",
    "natural language processing",
    "creative writing",
    "content generation",
    "brainstorming",
    "storytelling",
    "article writing",
    "blog posts",
    "social media content",
    "marketing copy",
    "academic writing",
    "technical documentation"
  ];
  
  return words[Math.floor(Math.random() * words.length)];
}
