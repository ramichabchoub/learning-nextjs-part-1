export default async function getUser(userId: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!res.ok) {
    throw new Error("failed to fetch user");
  }
  const user = await res.json();
  return user;
}
