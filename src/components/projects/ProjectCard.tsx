import React from 'react';

interface Props {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const ProjectCard: React.FC<Props> = ({ title, description, image, tags, link }) => {
  return (
    <article className="group rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1 dark:bg-slate-600/50">
      <a href={link} target="_blank">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 dark:text-white text-black">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="text-xs bg-gray-200 dark:bg-gray-800/40 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </article>
  );
};

export default ProjectCard;
