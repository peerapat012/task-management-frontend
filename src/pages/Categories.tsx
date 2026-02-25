import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryList } from '@/components/categories/CategoryList';
import { CategoryModal } from '@/components/categories/CategoryModal';
import { useCategories } from '@/contexts/CategoryContext';
import { useTasks } from '@/contexts/TaskContext';
import { Category } from '@/types';

export function CategoriesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const { tasks } = useTasks();

  const taskCounts = categories.reduce((acc, cat) => {
    acc[cat.id] = tasks.filter((t) => t.categoryId === cat.id).length;
    return acc;
  }, {} as Record<string, number>);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleSaveCategory = (data: { name: string; color: string }) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, data);
    } else {
      addCategory(data);
    }
    setModalOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-slate-500">Manage your task categories</p>
        </div>
        <Button onClick={handleAddCategory}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <CategoryList
        categories={categories}
        taskCounts={taskCounts}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
      />

      <CategoryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        category={editingCategory}
        onSave={handleSaveCategory}
      />
    </div>
  );
}
