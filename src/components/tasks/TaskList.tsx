import { ListTodo } from 'lucide-react';
import { useTasks } from '@/contexts/TaskContext';
import { useCategories } from '@/contexts/CategoryContext';
import { TaskItem } from './TaskItem';
import { Task } from '@/types';

interface TaskListProps {
  onEditTask: (task: Task) => void;
}

export function TaskList({ onEditTask }: TaskListProps) {
  const { filteredTasks, toggleTaskStatus, deleteTask } = useTasks();
  const { categories } = useCategories();

  const getCategoryInfo = (categoryId: string | null) => {
    if (!categoryId) return undefined;
    const category = categories.find((c) => c.id === categoryId);
    return category ? { name: category.name, color: category.color } : undefined;
  };

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
      {filteredTasks.map((task) => {
        const categoryInfo = getCategoryInfo(task.categoryId);
        return (
          <TaskItem
            key={task.id}
            task={task}
            categoryName={categoryInfo?.name}
            categoryColor={categoryInfo?.color}
            onToggle={toggleTaskStatus}
            onEdit={onEditTask}
            onDelete={deleteTask}
          />
        );
      })}
    </div>
  );
}
