import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface VideoProject {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
}

interface VideoCardProps {
  project: VideoProject;
  isEditMode: boolean;
  onDelete: (id: string) => void;
}

export function VideoCard({ project, isEditMode, onDelete }: VideoCardProps) {
  return (
    <div className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <ImageWithFallback
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isEditMode && (
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={() => onDelete(project.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-wider text-gray-400">
            {project.category}
          </span>
        </div>
        <h3 className="text-lg sm:text-xl mb-2 text-white">{project.title}</h3>
        <p className="text-gray-400 text-sm">{project.description}</p>
        
        {project.videoUrl && (
          <a
            href={project.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300"
          >
            Watch Project →
          </a>
        )}
      </div>
    </div>
  );
}
