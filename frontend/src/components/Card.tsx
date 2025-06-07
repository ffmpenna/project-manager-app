import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const tasks = {
  todo: [
    { id: 1, title: 'Planejar escopo' },
    { id: 2, title: 'Levantar requisitos' },
  ],
  inProgress: [
    { id: 3, title: 'Desenvolver API' },
    { id: 4, title: 'Criar layout' },
  ],
  done: [
    { id: 5, title: 'Configurar repositório' },
    { id: 6, title: 'Instalar dependências' },
  ],
};

export default function ProjectCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projeto X</CardTitle>
        <CardDescription>
          Descrição do projeto x tananan tananan
        </CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* To Do */}
        <div className="border border-blue-200 bg-blue-50 rounded-lg p-3 space-y-2">
          <h4 className="font-semibold text-blue-600">To Do</h4>
          <ul className="list-disc list-inside space-y-1">
            {tasks.todo.map((task) => (
              <li key={task.id} className="text-blue-600">
                {task.title}
              </li>
            ))}
          </ul>
        </div>

        {/* In Progress */}
        <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-3 space-y-2">
          <h4 className="font-semibold text-yellow-600">In Progress</h4>
          <ul className="list-disc list-inside space-y-1">
            {tasks.inProgress.map((task) => (
              <li key={task.id} className="text-yellow-600">
                {task.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Done */}
        <div className="border border-green-200 bg-green-50 rounded-lg p-3 space-y-2">
          <h4 className="font-semibold text-green-600">Done</h4>
          <ul className="list-disc list-inside space-y-1">
            {tasks.done.map((task) => (
              <li key={task.id} className="text-green-600">
                {task.title}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium text-gray-500">Members</span>
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
