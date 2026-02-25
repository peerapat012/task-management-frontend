import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskModal } from '@/components/tasks/TaskModal';
import { useTasks } from '@/contexts/TaskContext';
import { Task } from '@/types';

export function TasksPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { addTask, updateTask } = useTasks();

  const handleAddTask = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSaveTask = (data: any) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask({
        ...data,
        status: 'pending',
      });
    }
    setModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-slate-500">Manage your tasks</p>
        </div>
        <Button onClick={handleAddTask}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <TaskFilters />

      <TaskList onEditTask={handleEditTask} />

      <TaskModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        task={editingTask}
        onSave={handleSaveTask}
      />
    </div>
  );
}
