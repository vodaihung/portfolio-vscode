import { useState, useMemo } from 'react';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilter from '@/components/ProjectFilter';
import { projects } from '@/data/projects';

import styles from '@/styles/ProjectsPage.module.css';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories from projects
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(projects.map(project => project.category)));
    return uniqueCategories.sort();
  }, []);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') {
      return projects;
    }
    return projects.filter(project => project.category === selectedCategory);
  }, [selectedCategory]);

  // Calculate project counts for each category
  const projectCounts = useMemo(() => {
    const counts: Record<string, number> = { all: projects.length };
    categories.forEach(category => {
      counts[category] = projects.filter(project => project.category === category).length;
    });
    return counts;
  }, [categories]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className={styles.layout}>
      <h1 className={styles.pageTitle}>My Projects</h1>
      <p className={styles.pageSubtitle}>
        Here&apos;s a collection of my recent work. These projects showcase my
        skills in web development, design, and problem-solving.
      </p>

      <ProjectFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        projectCounts={projectCounts}
      />

      <div className={styles.container}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className={styles.noResults}>
          <p>No projects found in this category.</p>
        </div>
      )}
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Projects' },
  };
}

export default ProjectsPage;
