import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface WorkProject {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  videoUrl: string;
  gradient: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  enabled: boolean;
}

export interface ContactInfo {
  email: string;
  heading: string;
  description: string;
}

export interface ShowreelData {
  videoUrl: string;
  title: string;
  subtitle: string;
  duration: string;
}

interface ContentContextType {
  projects: WorkProject[];
  setProjects: (projects: WorkProject[]) => void;
  socialLinks: SocialLink[];
  setSocialLinks: (links: SocialLink[]) => void;
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
  showreelData: ShowreelData;
  setShowreelData: (data: ShowreelData) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const defaultProjects: WorkProject[] = [
  {
    id: "1",
    title: "MIDNIGHT ECHOES",
    category: "Feature Film",
    year: "2026",
    description: "A neo-noir thriller exploring the depths of human consciousness",
    videoUrl: "",
    gradient: "from-purple-900/80 to-black",
  },
  {
    id: "2",
    title: "URBAN PULSE",
    category: "Commercial",
    year: "2025",
    description: "High-energy brand campaign capturing city life",
    videoUrl: "",
    gradient: "from-blue-900/80 to-black",
  },
  {
    id: "3",
    title: "SILENT WAVES",
    category: "Short Film",
    year: "2025",
    description: "An intimate portrait of isolation and connection",
    videoUrl: "",
    gradient: "from-indigo-900/80 to-black",
  },
  {
    id: "4",
    title: "NEON DREAMS",
    category: "Music Video",
    year: "2024",
    description: "Experimental visual narrative blending reality and fantasy",
    videoUrl: "",
    gradient: "from-pink-900/80 to-black",
  },
];

const defaultSocialLinks: SocialLink[] = [
  { id: "1", platform: "Instagram", url: "#", enabled: true },
  { id: "2", platform: "LinkedIn", url: "#", enabled: true },
  { id: "3", platform: "Twitter", url: "#", enabled: false },
  { id: "4", platform: "WhatsApp", url: "#", enabled: true },
];

const defaultContactInfo: ContactInfo = {
  email: "hello@kaiina.com",
  heading: "LET'S CREATE",
  description: "Ready to bring your vision to life? Let's collaborate on something extraordinary.",
};

const defaultShowreelData: ShowreelData = {
  videoUrl: "",
  title: "2024 - 2026 REEL",
  subtitle: "Directed & Edited by KAIINA",
  duration: "03:24",
};

export function ContentProvider({ children }: { children: ReactNode }) {
  const [projects, setProjectsState] = useState<WorkProject[]>(() => {
    const saved = localStorage.getItem("kaiina_projects");
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [socialLinks, setSocialLinksState] = useState<SocialLink[]>(() => {
    const saved = localStorage.getItem("kaiina_social_links");
    return saved ? JSON.parse(saved) : defaultSocialLinks;
  });

  const [contactInfo, setContactInfoState] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem("kaiina_contact_info");
    return saved ? JSON.parse(saved) : defaultContactInfo;
  });

  const [showreelData, setShowreelDataState] = useState<ShowreelData>(() => {
    const saved = localStorage.getItem("kaiina_showreel");
    return saved ? JSON.parse(saved) : defaultShowreelData;
  });

  const setProjects = (newProjects: WorkProject[]) => {
    setProjectsState(newProjects);
    localStorage.setItem("kaiina_projects", JSON.stringify(newProjects));
  };

  const setSocialLinks = (newLinks: SocialLink[]) => {
    setSocialLinksState(newLinks);
    localStorage.setItem("kaiina_social_links", JSON.stringify(newLinks));
  };

  const setContactInfo = (newInfo: ContactInfo) => {
    setContactInfoState(newInfo);
    localStorage.setItem("kaiina_contact_info", JSON.stringify(newInfo));
  };

  const setShowreelData = (newData: ShowreelData) => {
    setShowreelDataState(newData);
    localStorage.setItem("kaiina_showreel", JSON.stringify(newData));
  };

  return (
    <ContentContext.Provider
      value={{
        projects,
        setProjects,
        socialLinks,
        setSocialLinks,
        contactInfo,
        setContactInfo,
        showreelData,
        setShowreelData,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return context;
}
