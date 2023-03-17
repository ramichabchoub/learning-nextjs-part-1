export default async function getUserPosts(userId: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId${userId}`);
  if (!res.ok) {
    throw new Error("failed to fetch posts");
  }
  const posts = await res.json();
  return posts;
}
