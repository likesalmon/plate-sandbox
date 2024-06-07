import { db } from "~/db/db";
import { posts, Post , InsertPost} from "~/db/schema";
import { eq } from "drizzle-orm";

export async function getPosts(): Promise<Post[]> {
  return db.query.posts.findMany();
}

export async function getPost(slug: string): Promise<Post[]> {
  return db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
}

export async function createPost(post: InsertPost): Promise<Post[]> {
  return db.insert(posts).values(post).returning();
}
