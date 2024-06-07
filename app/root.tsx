import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration, useRouteError
} from "@remix-run/react";
import stylesheet from "~/tailwind.css?url";
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesheet }];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <head title="plate-sandbox">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
    {children}
    <ScrollRestoration />
    <Scripts />
    </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html lang="en">
    <head>
      <title>Oh no!</title>
      <Meta />
      <Links />
    </head>
    <body>
    {/* add the UI you want your users to see */}
    <Scripts />
    </body>
    </html>
  );
}

export default function App() {
  return <div className="max-w-screen-xl m-auto py-12"><Outlet /></div>;
}
