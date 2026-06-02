"use client";

interface Project {
  id: number;
  title: string;
  description: string;
  category?: string;
  featured?: boolean;
  displayOrder?: number;
  createdAt?: string;
}

interface ProjectsListProps {
  projects: Project[];
  loading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ProjectsList({
  projects,
  loading,
  onEdit,
  onDelete,
}: ProjectsListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-800 rounded-lg">
        <p className="text-gray-400 text-lg">No projects yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-gray-800 rounded-lg p-6 flex justify-between items-start hover:bg-gray-750 transition"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              {project.featured && (
                <span className="inline-block px-2 py-1 bg-yellow-600 text-white text-xs rounded font-semibold">
                  Featured
                </span>
              )}
            </div>
            <p className="text-gray-400 mb-3 line-clamp-2">{project.description}</p>
            <div className="flex gap-4 text-sm text-gray-500">
              {project.category && (
                <span>Category: <span className="text-gray-300">{project.category}</span></span>
              )}
              <span>Order: <span className="text-gray-300">{project.displayOrder || 0}</span></span>
              {project.createdAt && (
                <span>Created: <span className="text-gray-300">{new Date(project.createdAt).toLocaleDateString()}</span></span>
              )}
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <button
              onClick={() => onEdit(project.id)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
