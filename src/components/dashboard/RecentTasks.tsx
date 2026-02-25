import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Task, Priority } from '@/types';
import { cn } from '@/lib/utils';

interface RecentTasksProps {
  tasks: Task[];
  onToggle: (id: string) => void;
}

const priorityConfig: Record<Priority, { className: string }> = {
  high: { className: 'bg-red-100 text-red-700' },
  medium: { className: 'bg-amber-100 text-amber-700' },
  low: { className: 'bg-blue-100 text-blue-700' },
};

export function RecentTasks({ tasks, onToggle }: RecentTasksProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        No recent tasks
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center gap-3 rounded-lg border border-slate-200 p-3"
        >
          <Checkbox
            checked={task.status === 'completed'}
            onCheckedChange={() => onToggle(task.id)}
          />
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                'font-medium text-slate-900 truncate',
                task.status === 'completed' && 'line-through text-slate-500'
              )}
            >
              {task.title}
            </p>
            {task.dueDate && (
              <p className="text-xs text-slate-500">
                {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </p>
            )}
          </div>
          <Badge className={cn('text-xs', priorityConfig[task.priority].className)}>
            {task.priority}
          </Badge>
        </div>
      ))}
    </div>
  );
}
