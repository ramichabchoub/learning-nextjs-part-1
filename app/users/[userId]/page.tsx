import { Suspense } from "react";
import type { Metadata } from "next";
import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPost";
import getAllUsers from "@/lib/getAllUsers";
import UserPosts from "./components/UserPosts";

import { notFound } from "next/navigation";

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
  if (!user.name) {
    return {
      title: "Not Found",
    };
  }
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
  if (!user.name) {
    return notFound();
  }
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

export async function generateStaticParams() {
  const usersData: Promise<User[]> = getAllUsers();
  const users = await usersData;
  return users.map((user) => {
    return {
      params: {
        id: user.id.toString(),
      },
    };
  });
}
