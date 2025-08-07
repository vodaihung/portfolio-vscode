import React from 'react';
import styles from '@/styles/ProjectFilter.module.css';

interface ProjectFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  projectCounts: Record<string, number>;
}

const ProjectFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  projectCounts 
}: ProjectFilterProps) => {
  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.filterTitle}>Filter by Category</h3>
      <div className={styles.filterTags}>
        <button
          className={`${styles.filterTag} ${selectedCategory === 'all' ? styles.active : ''}`}
          onClick={() => onCategoryChange('all')}
        >
          All Projects
          <span className={styles.count}>({projectCounts.all})</span>
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.filterTag} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {getCategoryDisplayName(category)}
            <span className={styles.count}>({projectCounts[category] || 0})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const getCategoryDisplayName = (category: string): string => {
  const displayNames: Record<string, string> = {
    'web-app': 'Web Applications',
    'lovable': 'Lovable Projects',
    'replit': 'Replit Projects',
  };
  return displayNames[category] || category;
};

export default ProjectFilter;
