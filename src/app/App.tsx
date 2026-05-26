import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ContentProvider } from "./context/ContentContext";
import { Toaster } from "./components/ui/sonner";
import faviconImage from "../imports/favicon.jpg.jpeg";
import logoImage from "../imports/dddd.jpg-2.jpeg";

export default function App() {
  useEffect(() => {
    // Set favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/jpeg';
    link.rel = 'icon';
    link.href = faviconImage;
    document.head.appendChild(link);

    // Preload critical hero logo
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = logoImage;
    document.head.appendChild(preloadLink);

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