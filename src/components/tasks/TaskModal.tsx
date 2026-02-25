import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Task, Priority, TaskStatus } from '@/types';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['high', 'medium', 'low']),
  status: z.enum(['pending', 'in_progress', 'completed']).optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  onSave: (data: TaskFormData) => void;
}

const priorityConfig: Record<Priority, { label: string; color: string; selectedColor: string }> = {
  high: { label: 'High', color: 'border-slate-200', selectedColor: 'border-red-500 bg-red-50' },
  medium: { label: 'Medium', color: 'border-slate-200', selectedColor: 'border-amber-500 bg-amber-50' },
  low: { label: 'Low', color: 'border-slate-200', selectedColor: 'border-blue-500 bg-blue-50' },
};

const priorities: Priority[] = ['high', 'medium', 'low'];

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

export function TaskModal({ open, onOpenChange, task, onSave }: TaskModalProps) {
  const [selectedPriority, setSelectedPriority] = useState<Priority>('medium');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>('pending');

  useEffect(() => {
    if (open) {
      if (task) {
        setSelectedPriority(task.priority);
        setSelectedStatus(task.status);
      } else {
        setSelectedPriority('medium');
        setSelectedStatus('pending');
      }
    }
  }, [open, task]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending',
    },
  });

  const onSubmit = (data: TaskFormData) => {
    onSave({ 
      ...data,
      status: selectedStatus,
    });
    reset();
    onOpenChange(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
      setSelectedPriority('medium');
      setSelectedStatus('pending');
    }
    onOpenChange(isOpen);
  };

  const handlePriorityChange = (priority: Priority) => {
    setSelectedPriority(priority);
    setValue('priority', priority);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
          <DialogDescription>
            {task ? 'Update the task details below.' : 'Fill in the details to create a new task.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter task description"
                {...register('description')}
              />
            </div>

            <div className="grid gap-2">
              <Label>Priority</Label>
              <div className="flex gap-2">
                {priorities.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handlePriorityChange(p)}
                    className={cn(
                      'flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 transition-colors',
                      priorityConfig[p].color,
                      selectedPriority === p ? priorityConfig[p].selectedColor : 'hover:bg-slate-50'
                    )}
                  >
                    <span className={cn('h-2 w-2 rounded-full', priorityConfig[p].color.replace('border-', 'bg-').replace('200', '500'))} />
                    <span className="text-sm capitalize">{priorityConfig[p].label}</span>
                  </button>
                ))}
              </div>
            </div>

            {task && (
              <div className="grid gap-2">
                <Label>Status</Label>
                <div className="flex gap-2">
                  {statusOptions.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setSelectedStatus(s.value)}
                      className={cn(
                        'flex flex-1 items-center justify-center rounded-lg border px-3 py-2 text-sm transition-colors',
                        selectedStatus === s.value
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-slate-200 hover:bg-slate-50'
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{task ? 'Save Changes' : 'Create Task'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
