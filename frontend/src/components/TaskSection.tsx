import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface Task {
  id: number;
  title: string;
}

interface TaskSectionProps {
  color: "blue" | "yellow" | "green";
  title: string;
  tasks: Task[];
}

export function TaskSection({ color, title, tasks }: TaskSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const maxVisible = 2;

  const borderColor = {
    blue: "bg-blue-50 text-blue-600",
    yellow: "bg-yellow-50 text-yellow-600",
    green: "bg-green-50 text-green-600",
  }[color];

  const colorText = {
    blue: "text-blue-600",
    yellow: "text-yellow-600",
    green: "text-green-600",
  }[color];

  const hasOverflow = tasks.length > maxVisible;

  const displayedTasks = tasks.map((task, index) => ({
    ...task,
    hidden: !expanded && index >= maxVisible,
  }));

  return (
    <div
      className={`inset-shadow-sm border rounded-lg p-3 space-y-2 ${borderColor}`}
    >
      <h4 className={`font-semibold ${colorText}`}>{title}</h4>

      <motion.div layout className="overflow-hidden">
        <ul className="list-disc list-inside space-y-1">
          {displayedTasks.map((task) => (
            <motion.li
              key={task.id}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: task.hidden ? 0 : 1,
                height: task.hidden ? 0 : "auto",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              {task.title}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {hasOverflow && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="hover:cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            <div>
              {expanded ? (
                <ChevronUp strokeWidth={3} />
              ) : (
                <ChevronDown strokeWidth={3} />
              )}
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
