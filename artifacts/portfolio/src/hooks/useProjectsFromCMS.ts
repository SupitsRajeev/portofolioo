import { useState, useEffect } from "react";
import { fetchCMSProjects, type CMSProject } from "@/lib/cms";

export type { CMSProject } from "@/lib/cms";

export function useProjectsFromCMS(featured: boolean = false) {
  const [projects, setProjects] = useState<CMSProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchCMSProjects(featured);
        setProjects(data || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("Error fetching projects from CMS:", message);
        setError(message);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [featured]);

  return { projects, loading, error };
}
