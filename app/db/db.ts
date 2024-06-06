import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

export const db = drizzle(sql, { schema });

/**
 * Why put methods here instead of in the component?
 */
// export const getPosts = async () => {
//   return db.query.posts.findMany()
// }
