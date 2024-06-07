import { isRouteErrorResponse, useLoaderData, useRouteError, Link } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";
import { marked } from "marked";


export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.slug, "Slug is required");
  const posts = await getPost(params.slug);
  invariant(posts.length, "Post not found");
  const html = marked(posts[0].markdown);
  return json({ post: posts[0], html, slug: params.slug });
};
//
export default function PostSlug() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <main>
      <Link to="/posts" className="text-blue-600 underline">Back</Link>
      <h1 className="text-7xl">{loaderData.post.title}</h1>
      <div>{loaderData.slug}</div>
      <article dangerouslySetInnerHTML={{ __html: loaderData.html }} />
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="text-red-600">
      {
        isRouteErrorResponse(error) ? <div>{error.statusText}: {error.data}</div> : <div>Oh no!</div>
      }
    </div>
  );
}

