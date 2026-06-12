import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { LogOut, Save, Plus, Trash2, Eye } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import {
  createProjectInSupabase,
  deleteProjectInSupabase,
  updateProjectInSupabase,
} from "../../hooks/useSupabaseProjects";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";
import { toast } from "sonner";

export function AdminPanel() {
  const navigate = useNavigate();
  const {
    projects,
    setProjects,
    socialLinks,
    setSocialLinks,
    contactInfo,
    setContactInfo,
    showreelData,
    setShowreelData,
  } = useContent();

  const [editingProject, setEditingProject] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("kaiina_admin_auth");
    navigate("/admin/login");
  };

  const handleAddProject = async () => {
    const newProject = {
      id: Date.now().toString(),
      title: "NEW PROJECT",
      category: "Category",
      year: new Date().getFullYear().toString(),
      description: "Project description",
      videoUrl: "",
      gradient: "from-purple-900/80 to-black",
    };

    setProjects([...projects, newProject]);

    try {
      await createProjectInSupabase(newProject);
      toast.success("Project added");
    } catch (err) {
      console.error("Add project error", err);
      toast.error("Unable to save project to Supabase");
    }
  };

  const handleUpdateProject = async (id: string, field: string, value: string) => {
    const updatedProjects = projects.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    );

    setProjects(updatedProjects);

    const updatedProject = updatedProjects.find((project) => project.id === id);
    if (!updatedProject) return;

    try {
      await updateProjectInSupabase(updatedProject);
    } catch (err) {
      console.error("Update project error", err);
      toast.error("Unable to save project update");
    }
  };

  const handleDeleteProject = async (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));

    try {
      await deleteProjectInSupabase(id);
      toast.success("Project deleted");
    } catch (err) {
      console.error("Delete project error", err);
      toast.error("Unable to delete project from Supabase");
    }
  };

  const handleToggleSocial = (id: string) => {
    setSocialLinks(
      socialLinks.map((link) =>
        link.id === id ? { ...link, enabled: !link.enabled } : link
      )
    );
    toast.success("Social link updated");
  };

  const handleUpdateSocialUrl = (id: string, url: string) => {
    setSocialLinks(
      socialLinks.map((link) =>
        link.id === id ? { ...link, url } : link
      )
    );
  };

  const handleSaveContact = () => {
    toast.success("Contact information saved");
  };

  const handleSaveShowreel = () => {
    toast.success("Showreel updated");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/10 to-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">KAIINA ADMIN</h1>
            <p className="text-sm text-gray-400">Content Management System</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => window.open("/", "_blank")}
              variant="outline"
              className="border-white/20 hover:border-white/40"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Site
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="work" className="space-y-8">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="work">Selected Work</TabsTrigger>
            <TabsTrigger value="showreel">Showreel</TabsTrigger>
            <TabsTrigger value="contact">Contact & Social</TabsTrigger>
          </TabsList>

          {/* Work Projects Tab */}
          <TabsContent value="work" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Manage Work Projects</h2>
                <p className="text-gray-400">Add, edit, or remove your portfolio pieces</p>
              </div>
              <Button
                onClick={handleAddProject}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            <div className="grid gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-white/5 border-white/10">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Input
                          value={project.title}
                          onChange={(e) => handleUpdateProject(project.id, "title", e.target.value)}
                          className="text-xl font-bold bg-transparent border-none p-0 h-auto focus-visible:ring-0 mb-2"
                          placeholder="Project Title"
                        />
                        <div className="flex gap-4">
                          <Input
                            value={project.category}
                            onChange={(e) => handleUpdateProject(project.id, "category", e.target.value)}
                            className="bg-white/10 border-white/20 text-sm w-40"
                            placeholder="Category"
                          />
                          <Input
                            value={project.year}
                            onChange={(e) => handleUpdateProject(project.id, "year", e.target.value)}
                            className="bg-white/10 border-white/20 text-sm w-24"
                            placeholder="Year"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDeleteProject(project.id)}
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => handleUpdateProject(project.id, "description", e.target.value)}
                        className="bg-white/10 border-white/20 mt-2"
                        rows={2}
                        placeholder="Project description"
                      />
                    </div>
                    <div>
                      <Label>Video URL (YouTube, Vimeo, or direct link)</Label>
                      <Input
                        value={project.videoUrl}
                        onChange={(e) => handleUpdateProject(project.id, "videoUrl", e.target.value)}
                        className="bg-white/10 border-white/20 mt-2"
                        placeholder="https://youtube.com/watch?v=..."
                      />
                      {project.videoUrl && (
                        <p className="text-xs text-green-400 mt-1">✓ Video URL set</p>
                      )}
                    </div>
                    <div>
                      <Label>Gradient (Tailwind classes)</Label>
                      <Input
                        value={project.gradient}
                        onChange={(e) => handleUpdateProject(project.id, "gradient", e.target.value)}
                        className="bg-white/10 border-white/20 mt-2"
                        placeholder="from-purple-900/80 to-black"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Showreel Tab */}
          <TabsContent value="showreel" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Manage Showreel</h2>
              <p className="text-gray-400">Update your showreel video and information</p>
            </div>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Showreel Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure your main showreel video
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Video URL (YouTube, Vimeo, or direct link)</Label>
                  <Input
                    value={showreelData.videoUrl}
                    onChange={(e) => setShowreelData({ ...showreelData, videoUrl: e.target.value })}
                    className="bg-white/10 border-white/20 mt-2"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                  {showreelData.videoUrl && (
                    <p className="text-xs text-green-400 mt-1">✓ Video URL set</p>
                  )}
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={showreelData.title}
                    onChange={(e) => setShowreelData({ ...showreelData, title: e.target.value })}
                    className="bg-white/10 border-white/20 mt-2"
                    placeholder="2024 - 2026 REEL"
                  />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <Input
                    value={showreelData.subtitle}
                    onChange={(e) => setShowreelData({ ...showreelData, subtitle: e.target.value })}
                    className="bg-white/10 border-white/20 mt-2"
                    placeholder="Directed & Edited by KAIINA"
                  />
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input
                    value={showreelData.duration}
                    onChange={(e) => setShowreelData({ ...showreelData, duration: e.target.value })}
                    className="bg-white/10 border-white/20 mt-2"
                    placeholder="03:24"
                  />
                </div>
                <Button
                  onClick={handleSaveShowreel}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Showreel
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact & Social Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Contact & Social Media</h2>
              <p className="text-gray-400">Manage contact information and social links</p>
            </div>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Update the "Let's Create" section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Section Heading</Label>
                  <Input
                    value={contactInfo.heading}
                    onChange={(e) => setContactInfo({ ...contactInfo, heading: e.target.value })}
                    className="bg-white/10 border-white/20 mt-2"
                    placeholder="LET'S CREATE"
                  />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="bg-white/10 border-white/20 mt-2"
                    placeholder="hello@kaiina.com"
                  />
                </div>
                <div>
                  <Label>Description Text</Label>
                  <Textarea
                    value={contactInfo.description}
                    onChange={(e) => setContactInfo({ ...contactInfo, description: e.target.value })}
                    className="bg-white/10 border-white/20 mt-2"
                    rows={3}
                    placeholder="Ready to bring your vision to life?"
                  />
                </div>
                <Button
                  onClick={handleSaveContact}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Contact Info
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription className="text-gray-400">
                  Enable/disable platforms and set URLs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLinks.map((link) => (
                  <div key={link.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                    <Switch
                      checked={link.enabled}
                      onCheckedChange={() => handleToggleSocial(link.id)}
                    />
                    <div className="flex-1">
                      <Label className="text-sm font-medium">{link.platform}</Label>
                      <Input
                        value={link.url}
                        onChange={(e) => handleUpdateSocialUrl(link.id, e.target.value)}
                        className="bg-white/10 border-white/20 mt-2"
                        placeholder={`${link.platform} URL`}
                        disabled={!link.enabled}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
