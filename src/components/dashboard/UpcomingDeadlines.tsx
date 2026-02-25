import { format, isPast, isToday } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Task, Priority } from '@/types';
import { cn } from '@/lib/utils';

interface UpcomingDeadlinesProps {
  tasks: Task[];
}

const priorityConfig: Record<Priority, { dotColor: string }> = {
  high: { dotColor: 'bg-red-500' },
  medium: { dotColor: 'bg-amber-500' },
  low: { dotColor: 'bg-blue-500' },
};

export function UpcomingDeadlines({ tasks }: UpcomingDeadlinesProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        No upcoming deadlines
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const dueDate = task.dueDate ? new Date(task.dueDate) : null;
        const isOverdue = dueDate && isPast(dueDate) && task.status === 'pending';
        const isDueToday = dueDate && isToday(dueDate);

        return (
          <div
            key={task.id}
            className={cn(
              'flex items-center gap-3 rounded-lg border p-3',
              isOverdue ? 'border-red-200 bg-red-50' : 'border-slate-200'
            )}
          >
            <div className={cn('h-2 w-2 rounded-full', priorityConfig[task.priority].dotColor)} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-900 truncate">{task.title}</p>
              {dueDate && (
                <p
                  className={cn(
                    'flex items-center gap-1 text-xs',
                    isOverdue ? 'text-red-600' : isDueToday ? 'text-amber-600' : 'text-slate-500'
                  )}
                >
                  <Calendar className="h-3 w-3" />
                  {format(dueDate, 'MMM d, yyyy')}
                  {isOverdue && ' (Overdue)'}
                  {isDueToday && ' (Today)'}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
