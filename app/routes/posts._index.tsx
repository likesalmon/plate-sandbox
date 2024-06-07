import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getPosts } from "~/models/post.server";

export const loader = async () => {
  return json({
    posts: await getPosts()
  });
};

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <main>
      <Link to="admin" className="text-blue-600 underline">
        Admin
      </Link>
      <h1 className="text-7xl">Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={post.slug} className="text-blue-600 underline"><h2>{post.title}</h2></Link>
          </li>
        ))}</ul>
    </main>
  );
}
