import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleSmall, EllipsisVertical } from "lucide-react";
import { Link } from "react-router";
import { getProjectProgress } from "@/helpers/getProjectProgress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Task = {
  id: number;
  title: string;
};

type Tasks = {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
};

type Project = {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  color: string;
  status: string;
  tasks: Tasks;
};

interface ProjectCardProps {
  project: Project;
}

const colorOptions = [
  "#E57373",
  "#F06292",
  "#BA68C8",
  "#9575CD",
  "#7986CB",
  "#64B5F6",
  "#4DD0E1",
  "#4DB6AC",
  "#81C784",
  "#AED581",
  "#DCE775",
  "#FFF176",
  "#FFD54F",
  "#FFB74D",
  "#FF8A65",
  "#A1887F",
  "#90A4AE",
  "#F48FB1",
  "#CE93D8",
  "#B0BEC5",
];
const avatars = [
  { src: "https://github.com/shadcn.png", alt: "@shadcn", fallback: "CN" },
  { src: "https://github.com/leerob.png", alt: "@leerob", fallback: "LR" },
  { src: "https://github.com/evilrabbit.png", alt: "@evilrabbit", fallback: "ER" },
];

export default function ProjectCard({ project }: ProjectCardProps) {
  const [openLeave, setOpenLeave] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [editTitle, setEditTitle] = useState(project.title);
  const [editDescription, setEditDescription] = useState(project.description);
  const [editColor, setEditColor] = useState(project.color);

  const progressValue = getProjectProgress(project.tasks);

  const isProjectComplete = progressValue === 100;

  const handleEditSave = () => {
    console.log("Novo título:", editTitle);
    console.log("Nova descrição:", editDescription);
    project.title = editTitle;
    project.description = editDescription;
    project.color = editColor;
    setOpenEdit(false);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="hover:cursor-pointer hover:bg-accent rounded-sm py-1">
                <EllipsisVertical size="20" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
              <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOpenLeave(true)}
                className="text-red-600"
              >
                Leave
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>

        <CardTitle className="flex items-center gap-1">
          <CircleSmall size={15} fill={project.color} color={project.color} />
          <Link className="hover:text-primary" to={`projects/${project.id}`}>
            {project.title}
          </Link>
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col gap-4">
        <div>
          <Progress
            className={cn(
              isProjectComplete && "[&_[data-slot=progress-indicator]]:bg-emerald-600"
            )}
            value={progressValue}
          />
          <div
            className={cn(
              "text-start font-bold flex justify-between",
              isProjectComplete ? "text-emerald-600" : "text-primary"
            )}
          >
            <p>Progress</p>
            <p>
              {isProjectComplete
                ? "Complete!"
                : project.tasks.done.length +
                  "/" +
                  (project.tasks.inProgress.length +
                    project.tasks.todo.length +
                    project.tasks.done.length)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <p
            className={cn(
              "w-fit justify-self-end bg-primary/50 rounded-full text-white font-semibold px-3",
              isProjectComplete && "bg-emerald-600"
            )}
          >
            To do: {project.tasks.todo.length}
          </p>
          <p
            className={cn(
              " bg-primary/80 rounded-full text-white font-semibold px-3",
              isProjectComplete && "bg-emerald-600"
            )}
          >
            In Progress: {project.tasks.inProgress.length}
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-medium text-gray-500">Members</span>

          <div className="flex -space-x-2">
            {avatars.map((avatar, i) => (
              <Tooltip key={i}>
                <TooltipTrigger>
                  <div className="group">
                    <div
                      className="
                border-2 hover:border-primary 
                rounded-full relative
                z-0 transition-all duration-200 
                group-hover:cursor-pointer group-hover:border-primary 
                group-hover:z-10 group-hover:-translate-y-1 
                group-hover:shadow-md"
                    >
                      <Avatar>
                        <AvatarImage src={avatar.src} alt={avatar.alt} />
                        <AvatarFallback>{avatar.fallback}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{avatar.alt}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </CardFooter>

      {/* Modal de editar */}
      <AlertDialog open={openEdit} onOpenChange={setOpenEdit}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Project</AlertDialogTitle>
            <AlertDialogDescription>Change below informations</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="project_title_input" className="mb-2">
                Title
              </Label>
              <Input
                id="project_title_input"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="project_description_input" className="mb-2">
                Description
              </Label>
              <Input
                id="project_description_input"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="project_color_input" className="mb-2">
                Color
              </Label>
              <RadioGroup
                value={editColor}
                onValueChange={setEditColor}
                className="grid grid-cols-10 w-fit p-3 border-2 rounded-lg shadow-[inset_0_0_6px_rgba(0,0,0,0.1)]"
              >
                {colorOptions.map((color) => (
                  <div key={color} className="relative m-0.25">
                    <RadioGroupItem value={color} id={color} className="sr-only" />
                    <Label
                      htmlFor={color}
                      className={`
          block w-8 h-8 rounded-full cursor-pointer transition
          ${editColor === color && "outline-3 outline-offset-2"}
        `}
                      style={{ backgroundColor: color }}
                    />
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleEditSave}>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal de sair */}
      <AlertDialog open={openLeave} onOpenChange={setOpenLeave}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you wanto to leave?</AlertDialogTitle>
            <AlertDialogDescription>
              You will no longer be part of this project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => setOpenLeave(false)}
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
