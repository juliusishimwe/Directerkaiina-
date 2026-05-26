import { lazy, Suspense } from "react";
import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";

// Lazy load components below the fold
const Work = lazy(() => import("../components/Work").then(m => ({ default: m.Work })));
const About = lazy(() => import("../components/About").then(m => ({ default: m.About })));
const Showreel = lazy(() => import("../components/Showreel").then(m => ({ default: m.Showreel })));
const Contact = lazy(() => import("../components/Contact").then(m => ({ default: m.Contact })));

export function MainLayout() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Work />
        <About />
        <Showreel />
        <Contact />
      </Suspense>
    </div>
  );
}
