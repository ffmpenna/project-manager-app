import { useState } from "react";
import ProjectCard from "@/components/Card";
import { projects as allProjects } from "../mocks/projects.mock";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDownAz,
  ArrowDownNarrowWide,
  ArrowUpAz,
  ArrowUpNarrowWide,
  Funnel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjectProgress } from "@/helpers/getProjectProgress";

export default function Home() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title-asc");

  const filteredProjects = allProjects
    .filter((project) => {
      if (statusFilter === "all") return true;
      return project.status === statusFilter;
    })
    .sort((a, b) => {
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      if (sortBy === "progress-asc")
        return getProjectProgress(a.tasks) - getProjectProgress(b.tasks);
      if (sortBy === "progress-desc")
        return getProjectProgress(b.tasks) - getProjectProgress(a.tasks);
      return 0;
    });

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
                onValueChange={setStatusFilter}
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
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
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
