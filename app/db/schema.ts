/**
 * Drizzle-kit docs: https://orm.drizzle.team/kit-docs/overview
 *
 * Generate migrations with `drizzle-kit generate`, then
 * migrate with `drizzle-kit migrate`.
 *
 * Alternatively, use `drizzle-kit push` to make changes without migration files.
 * Good for prototyping.
 */
import { pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Table name is plural
export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    markdown: text("markdown").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull()
  },
  // Additional config
  (posts) => {
    return {
      // I think this forces slug to be unique.
      uniqueIdx: uniqueIndex("unique_idx").on(posts.slug)
    };
  }
);

// See: https://orm.drizzle.team/docs/zod
export const insertPostSchema = createInsertSchema(posts)
export const selectPostSchema = createSelectSchema(posts)
/**
 * Usage:
 * const post = insertPostSchema.parse({slug: "hello-world", title: "Hello, World!"});
 */
