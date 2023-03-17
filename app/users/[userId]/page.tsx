import { Suspense } from "react";
import type { Metadata } from "next";
import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPost";
import UserPosts from "./components/UserPosts";

type Params = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({
  params: { userId },
}: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId);
  const user: User = await userData;
  return {
    title: user.name,
    description: `User ${user.name} page description`,
  };
}

export default async function UserPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId);
  const postsData: Promise<Post[]> = getUserPosts(userId);

  // const [user, posts] = await Promise.all([userData, postsData]);
  const user = await userData;
  return (
    <>
      <h1>{user.name}</h1>
      <br />
      <h2>User Posts:</h2>
      <br />
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Server Component */}
        <UserPosts promise={postsData} />
      </Suspense>
    </>
  );
}
