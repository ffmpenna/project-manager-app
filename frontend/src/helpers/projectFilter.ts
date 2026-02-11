import type { Project, SortBy, StatusFilter } from '@/types';
import { getProjectProgress } from './getProjectProgress';

export const filterProjects = (
  allProjects: Project[],
  statusFilter: StatusFilter,
  sortBy: SortBy,
) => {
  return allProjects
    .map((p) => ({
      ...p,
      _progress: getProjectProgress(p.tasks).progress,
    }))
    .filter((project) => {
      if (statusFilter === 'all') return true;
      return project.status === statusFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'title-desc') return b.title.localeCompare(a.title);

      if (sortBy === 'progress-asc') return a._progress - b._progress;
      if (sortBy === 'progress-desc') return b._progress - a._progress;

      return 0;
    });
};
