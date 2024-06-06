import { db } from "~/db/db";

type Post = {
  id: number
  slug: string;
  title: string;
}

export async function getPosts(): Promise<Post[]> {
  // return [
  //   { id: 1, slug: "hello-world", title: "Hello, World!" },
  //   { id: 2, slug: "another-post", title: "Another Post" }
  // ];
  return db.query.posts.findMany();
}
