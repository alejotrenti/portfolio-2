import { useState } from "react";
import ProjectCard from "./ProjectCard";

interface Project {
  id: string;
  title: string;
  description: string;
  image: any;
  tags: string[];
  link: string;
}


interface Props {
  projects: Project[];
  allTags: string[];
}

const Projects: React.FC<Props> = ({ projects, allTags }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      searchTerm === "" ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => project.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  return (
    <section id="projects" className="transition-colors py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-20">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-widest text-cyan-500 dark:text-cyan-400 mb-4 inline-block">
            Portafolio
          </span>
          <h2 className="text-4xl md:text-5xl font-light dark:text-white mb-6">
            Proyectos <span className="font-medium">Destacados</span>
          </h2>
          <div className="w-32 h-px bg-gray-200 dark:bg-slate-600 mx-auto"></div>
        </div>

        {/* Filtros */}
        <div className="mb-12 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Buscar proyectos..."
            className="w-full px-6 py-3 rounded-full border border-gray-300 dark:border-slate-800/60 bg-white dark:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-all dark:text-white text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                  selectedTags.includes(tag)
                    ? "bg-cyan-500 dark:bg-cyan-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800/40 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {tag}
              </button>
            ))} 
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="text-xs px-3 py-1.5 rounded-full bg-red-700 text-white dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-red-900 transition-all"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-32">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No se encontraron proyectos con los filtros seleccionados
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setSelectedTags([]);
              }}
              className="text-sm text-red-500 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
