import { useEffect, useState } from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface EditProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: {
    title: string;
    description: string;
    color: string;
  };
  onSubmit: (data: { title: string; description: string; color: string }) => void;
  colorOptions: string[];
}

export default function EditProjectDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  colorOptions,
}: EditProjectDialogProps) {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [color, setColor] = useState(initialData.color);

  // sempre que abrir o modal, ressincroniza os dados iniciais
  useEffect(() => {
    if (open) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setColor(initialData.color);
    }
  }, [open, initialData]);

  const handleSave = () => {
    onSubmit({
      title,
      description,
      color,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Project</AlertDialogTitle>
          <AlertDialogDescription>Change below informations</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4 py-4">
          {/* TITLE */}
          <div>
            <Label htmlFor="project_title_input" className="mb-2">
              Title
            </Label>
            <Input
              id="project_title_input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <Label htmlFor="project_description_input" className="mb-2">
              Description
            </Label>
            <Input
              id="project_description_input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* COLOR */}
          <div>
            <Label className="mb-2">Color</Label>
            <RadioGroup
              value={color}
              onValueChange={setColor}
              className="grid grid-cols-10 w-fit p-3 border-2 rounded-lg shadow-[inset_0_0_6px_rgba(0,0,0,0.1)]"
            >
              {colorOptions.map((c) => (
                <div key={c} className="relative m-0.25">
                  <RadioGroupItem value={c} id={c} className="sr-only" />
                  <Label
                    htmlFor={c}
                    className={`
                      block w-8 h-8 rounded-full cursor-pointer transition
                      ${color === c && 'outline-3 outline-offset-2'}
                    `}
                    style={{ backgroundColor: c }}
                  />
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
