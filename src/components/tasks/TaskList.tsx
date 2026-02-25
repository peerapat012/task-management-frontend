import { ListTodo } from 'lucide-react';
import { useTasks } from '@/contexts/TaskContext';
import { TaskItem } from './TaskItem';
import { Task } from '@/types';

interface TaskListProps {
  onEditTask: (task: Task) => void;
}

export function TaskList({ onEditTask }: TaskListProps) {
  const { filteredTasks, toggleTaskStatus, deleteTask, isLoading } = useTasks();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg font-medium text-slate-900">Loading tasks...</p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ListTodo className="h-12 w-12 text-slate-300 mb-4" />
        <p className="text-lg font-medium text-slate-900">No tasks found</p>
        <p className="text-sm text-slate-500 mt-1">Create a new task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTaskStatus}
          onEdit={onEditTask}
          onDelete={deleteTask}
        />
      ))}
    </div>
  );
}
