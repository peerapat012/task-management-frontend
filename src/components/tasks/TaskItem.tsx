import { format, isPast, isToday } from 'date-fns';
import { MoreVertical, Pencil, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Task, Priority } from '@/types';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  categoryName?: string;
  categoryColor?: string;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high: { label: 'High', className: 'bg-red-100 text-red-700' },
  medium: { label: 'Medium', className: 'bg-amber-100 text-amber-700' },
  low: { label: 'Low', className: 'bg-blue-100 text-blue-700' },
};

export function TaskItem({ task, categoryName, categoryColor, onToggle, onEdit, onDelete }: TaskItemProps) {
  const isOverdue = task.dueDate && task.status === 'pending' && isPast(new Date(task.dueDate));
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate));

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-sm',
        task.status === 'completed' && 'opacity-60'
      )}
    >
      <Checkbox
        checked={task.status === 'completed'}
        onCheckedChange={() => onToggle(task.id)}
        className="mt-1"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              'font-medium text-slate-900',
              task.status === 'completed' && 'line-through text-slate-500'
            )}
          >
            {task.title}
          </p>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {task.description && (
          <p className="mt-1 text-sm text-slate-500 line-clamp-2">{task.description}</p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge className={cn('text-xs', priorityConfig[task.priority].className)}>
            {priorityConfig[task.priority].label}
          </Badge>

          {categoryName && (
            <Badge variant="secondary" className="text-xs">
              {categoryColor && (
                <span
                  className="mr-1 h-2 w-2 rounded-full"
                  style={{ backgroundColor: categoryColor }}
                />
              )}
              {categoryName}
            </Badge>
          )}

          {task.dueDate && (
            <span
              className={cn(
                'flex items-center gap-1 text-xs',
                isOverdue ? 'text-red-500' : isDueToday ? 'text-amber-500' : 'text-slate-500'
              )}
            >
              <Calendar className="h-3 w-3" />
              {format(new Date(task.dueDate), 'MMM d, yyyy')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
