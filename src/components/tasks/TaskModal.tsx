import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Task, Priority } from '@/types';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['high', 'medium', 'low']),
  categoryId: z.string().nullable(),
  dueDate: z.string().nullable(),
  reminder: z.string().nullable(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  onSave: (data: any) => void;
}

const priorityConfig: Record<Priority, { label: string; color: string; selectedColor: string }> = {
  high: { label: 'High', color: 'border-slate-200', selectedColor: 'border-red-500 bg-red-50' },
  medium: { label: 'Medium', color: 'border-slate-200', selectedColor: 'border-amber-500 bg-amber-50' },
  low: { label: 'Low', color: 'border-slate-200', selectedColor: 'border-blue-500 bg-blue-50' },
};

const priorities: Priority[] = ['high', 'medium', 'low'];

export function TaskModal({ open, onOpenChange, task, onSave }: TaskModalProps) {
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [selectedPriority, setSelectedPriority] = useState<Priority>('medium');
  const [selectedCategory, setSelectedCategory] = useState<string>('__clear__');
  const [categories, setCategories] = useState<Array<{id: string, name: string, color: string}>>([]);

  useEffect(() => {
    const stored = localStorage.getItem('taskflow_categories');
    if (stored) {
      try {
        setCategories(JSON.parse(stored));
      } catch (e) {
        setCategories([]);
      }
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      if (task) {
        setSelectedPriority(task.priority);
        setDueDate(task.dueDate ? new Date(task.dueDate) : undefined);
        setSelectedCategory(task.categoryId || '');
      } else {
        setSelectedPriority('medium');
        setDueDate(undefined);
        setSelectedCategory('__clear__');
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
      categoryId: null,
      dueDate: null,
      reminder: null,
    },
  });

  const onSubmit = (data: TaskFormData) => {
    onSave({ 
      ...data, 
      dueDate: dueDate?.toISOString() || null,
      categoryId: selectedCategory || null 
    });
    reset();
    onOpenChange(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
      setDueDate(undefined);
      setSelectedPriority('medium');
      setSelectedCategory('');
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

            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={selectedCategory || '__clear__'}
                onValueChange={(value) => {
                  const finalValue = value === '__clear__' ? '' : value;
                  setSelectedCategory(finalValue);
                  setValue('categoryId', finalValue || null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__clear__">No category</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        {cat.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dueDate && 'text-slate-500'
                    )}
                  >
                    {dueDate ? format(dueDate, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => {
                      setDueDate(date);
                      setValue('dueDate', date?.toISOString() || null);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
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
