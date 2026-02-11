import { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { projects as allProjects } from '../mocks/projects.mock';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  ArrowDownAz,
  ArrowDownNarrowWide,
  ArrowUpAz,
  ArrowUpNarrowWide,
  Funnel,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { filterProjects } from '@/helpers/projectFilter';
import type { SortBy, StatusFilter } from '@/types';

export default function Home() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('title-asc');

  const filteredProjects = filterProjects(allProjects, statusFilter, sortBy);

  return (
    <div className="p-5">
      <div className="flex flex-col p-4 gap-3">
        <h1 className="font-bold text-4xl">MY PROJECTS</h1>

        <div className="flex gap-3">
          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" className="flex items-center gap-2">
                <Funnel className="w-4 h-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Show</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as StatusFilter)}
              >
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="in_progress">
                  In progress
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="done">Done</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowDownNarrowWide className="w-4 h-4" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortBy)}
              >
                <DropdownMenuLabel> Title </DropdownMenuLabel>
                <DropdownMenuRadioItem value="title-asc">
                  <ArrowDownAz className="text-primary" /> A-Z
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="title-desc">
                  <ArrowUpAz className="text-primary" /> Z-A
                </DropdownMenuRadioItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel> Progress </DropdownMenuLabel>
                <DropdownMenuRadioItem value="progress-asc">
                  <ArrowDownNarrowWide className="text-primary" /> Ascendant
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="progress-desc">
                  <ArrowUpNarrowWide className="text-primary" />
                  Descendant
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
