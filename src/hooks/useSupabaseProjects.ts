import { supabase, supabaseConfigured } from "../lib/supabase";
import type { WorkProject } from "../app/context/ContentContext";

const projectsTable = "projects";

export async function fetchProjectsFromSupabase(): Promise<WorkProject[] | null> {
  if (!supabaseConfigured) return null;

  const { data, error } = await supabase
    .from<WorkProject>(projectsTable)
    .select("*");

  if (error) {
    console.error("[Supabase] fetchProjects error", error);
    return null;
  }

  return data ?? [];
}

export async function createProjectInSupabase(project: WorkProject) {
  if (!supabaseConfigured) return;

  const { error } = await supabase
    .from<WorkProject>(projectsTable)
    .upsert(project, { onConflict: "id" });

  if (error) {
    console.error("[Supabase] createProject error", error);
    throw error;
  }
}

export async function updateProjectInSupabase(project: WorkProject) {
  if (!supabaseConfigured) return;

  const { id, ...payload } = project;
  const { error } = await supabase
    .from<WorkProject>(projectsTable)
    .update(payload)
    .eq("id", id);

  if (error) {
    console.error("[Supabase] updateProject error", error);
    throw error;
  }
}

export async function deleteProjectInSupabase(id: string) {
  if (!supabaseConfigured) return;

  const { error } = await supabase
    .from(projectsTable)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("[Supabase] deleteProject error", error);
    throw error;
  }
}
