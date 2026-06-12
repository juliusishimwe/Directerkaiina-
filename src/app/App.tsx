import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ContentProvider } from "./context/ContentContext";
import { Toaster } from "./components/ui/sonner";
import faviconImage from "../imports/favicon.jfif";


export default function App() {
  useEffect(() => {
    // Set favicon
    const existingLink = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
    const linkEl = existingLink || document.createElement('link');
    linkEl.type = 'image/jpeg';
    linkEl.rel = 'icon';
    linkEl.href = faviconImage;

    if (!existingLink) {
      document.head.appendChild(linkEl);
    }

    // Set document title
    document.title = "KAIINA | Cinematic Storyteller";
  }, []);

  return (
    <ContentProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ContentProvider>
  );
}