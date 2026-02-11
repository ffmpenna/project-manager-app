import { CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getProjectProgress } from '@/helpers/getProjectProgress';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

export function ProjectCardProgress({ tasks }: Project) {
  const { todo, inProgress, done, progress, total } = getProjectProgress(tasks);
  const isComplete = progress === 100;

  return (
    <CardContent className="p-4 flex flex-col gap-4">
      <div>
        <Progress
          className={cn(
            isComplete && '[&_[data-slot=progress-indicator]]:bg-emerald-600',
          )}
          value={progress}
        />

        <div
          className={cn(
            'text-start font-bold flex justify-between',
            isComplete ? 'text-emerald-600' : 'text-primary',
          )}
        >
          <p>Progress</p>

          <p>{isComplete ? 'Complete!' : `${done}/${total}`}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <p
          className={cn(
            'w-fit bg-primary/50 rounded-full text-white font-semibold px-3',
            isComplete && 'bg-emerald-600',
          )}
        >
          To do: {todo}
        </p>

        <p
          className={cn(
            'w-fit bg-primary/80 rounded-full text-white font-semibold px-3',
            isComplete && 'bg-emerald-600',
          )}
        >
          In Progress: {inProgress}
        </p>
      </div>
    </CardContent>
  );
}
