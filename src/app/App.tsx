import { useState, useEffect, useRef } from "react";
import { Edit, Save } from "lucide-react";
import gsap from "gsap";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { VideoCard, VideoProject } from "./components/VideoCard";
import { AddVideoDialog } from "./components/AddVideoDialog";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Button } from "./components/ui/button";

const API_BASE_URL = 'http://localhost:5000/api';

export default function App() {
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on user interaction
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    // Fetch videos from backend
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos`);
      if (response.ok) {
        const videos = await response.json();
        setProjects(videos);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const playClickSound = () => {
    if (!audioContextRef.current) return;

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const handleAddProject = async (newProject: Omit<VideoProject, "id">) => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
      if (response.ok) {
        const addedVideo = await response.json();
        setProjects([...projects, addedVideo]);
      }
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProjects(projects.filter(project => project.id !== id));
      }
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handleEditPortfolioClick = () => {
    const password = prompt("Enter password to edit portfolio:");
    if (password === "kaiina the D") {
      playClickSound();

      // Toggle edit mode
      const newEditMode = !isEditMode;
      setIsEditMode(newEditMode);

      // Animate background
      if (bodyRef.current) {
        gsap.to(bodyRef.current, {
          backgroundColor: newEditMode ? "#1c1f24" : "#000000",
          duration: 0.6,
          ease: "power2.inOut"
        });
      }
    } else if (password !== null) {
      alert("Incorrect password");
    }
  };

  return (
    <div ref={bodyRef} className="min-h-screen bg-black transition-colors duration-600">
      {/* Navigation Bar */}
      <Navbar />

      {/* Edit Mode Toggle Button */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <Button
          onClick={handleEditPortfolioClick}
          size="sm"
          variant={isEditMode ? "default" : "outline"}
          className={`gap-2 shadow-lg transition-all duration-300 ${
            isEditMode
              ? "bg-blue-600 hover:bg-blue-700 text-white scale-110"
              : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/20"
          }`}
        >
          {isEditMode ? (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="w-4 h-4" />
              Edit Portfolio
            </>
          )}
        </Button>
      </div>

      {/* Hero Section */}
      <div id="home">
        <Hero />
      </div>

      {/* Portfolio Section */}
      <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-white">Selected Works</h2>
            <p className="text-gray-400 text-base sm:text-lg">
              A showcase of my recent projects across different mediums
            </p>
          </div>

          {isEditMode && (
            <div className="flex justify-center mb-8 sm:mb-12">
              <AddVideoDialog onAdd={handleAddProject} />
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project) => (
              <VideoCard
                key={project.id}
                project={project}
                isEditMode={isEditMode}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-6">No projects yet. Add your first project!</p>
              {isEditMode && <AddVideoDialog onAdd={handleAddProject} />}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
