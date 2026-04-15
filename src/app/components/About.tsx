import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Edit } from "lucide-react";

export function About() {
  const [projects, setProjects] = useState("50+");
  const [awards, setAwards] = useState("12");
  const [years, setYears] = useState("15");

  const handleEdit = (field: "projects" | "awards" | "years") => {
    const password = prompt("Enter password to edit:");
    if (password === "kaiina the D") {
      const currentValue = field === "projects" ? projects : field === "awards" ? awards : years;
      const newValue = prompt(`Enter new value for ${field}:`, currentValue);
      if (newValue !== null) {
        if (field === "projects") setProjects(newValue);
        else if (field === "awards") setAwards(newValue);
        else setYears(newValue);
      }
    } else if (password !== null) {
      alert("Incorrect password");
    }
  };

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1612872750175-5b67ab0a6011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudGFyeSUyMGZpbG1pbmclMjBjYW1lcmF8ZW58MXx8fHwxNzc1MTQwOTA5fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Director portrait"
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
          
          <div className="text-white">
            <h2 className="text-3xl sm:text-4xl mb-4 sm:mb-6">About Me</h2>
            <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">
              <p>
                I am DIRECTOR KAIINA, a creative self driven videographer who loves turning ideas into visual stories. I am experienced in camera operation, video directing, video editing, color grading, and VFX to produce strong and engaging videos. I focus on quality, detail, and telling stories that people can feel and remember.
              </p>
              <p>
                Am a videographer with the purpose of growing as a filmmaker to create movies that inspire, entertain, and connect with people everywhere.
              </p>
            </div>
            
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-4 sm:gap-6">
              <div className="relative group">
                <div className="text-2xl sm:text-3xl mb-2">{projects}</div>
                <div className="text-gray-400 text-xs sm:text-sm">Projects</div>
                <button
                  onClick={() => handleEdit("projects")}
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 p-1 rounded"
                >
                  <Edit className="w-3 h-3 text-white" />
                </button>
              </div>
              <div className="relative group">
                <div className="text-2xl sm:text-3xl mb-2">{awards}</div>
                <div className="text-gray-400 text-xs sm:text-sm">Awards</div>
                <button
                  onClick={() => handleEdit("awards")}
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 p-1 rounded"
                >
                  <Edit className="w-3 h-3 text-white" />
                </button>
              </div>
              <div className="relative group">
                <div className="text-2xl sm:text-3xl mb-2">{years}</div>
                <div className="text-gray-400 text-xs sm:text-sm">Years</div>
                <button
                  onClick={() => handleEdit("years")}
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 p-1 rounded"
                >
                  <Edit className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
