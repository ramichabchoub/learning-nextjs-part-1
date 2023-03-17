import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import getAllUsers from "@/lib/getAllUsers";

export const metadata: Metadata = {
  title: "User Page",
  description: "User page description",
};

export default async function UserPage() {
  const usersData: Promise<User[]> = getAllUsers();
  const users = await usersData;
  // console.log(users);
  const content = (
    <section>
      <h2>
        <Link href="/">Back to Home</Link>
      </h2>
      <br />
      {users.map((user) => {
        return (
          <Fragment key={user.id}>
            <p>
              <Link href={`/users/${user.id}`}>{user.name}</Link>
            </p>
            <br />
          </Fragment>
        );
      })}
    </section>
  );
  return (
    <>
      <h1>Users:</h1>
      {content}
    </>
  );
}
