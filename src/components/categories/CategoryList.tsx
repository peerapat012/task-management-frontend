import { MoreVertical, Pencil, Trash2, Tags } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Category } from '@/types';

interface CategoryListProps {
  categories: Category[];
  taskCounts: Record<string, number>;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export function CategoryList({ categories, taskCounts, onEdit, onDelete }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Tags className="h-12 w-12 text-slate-300 mb-4" />
        <p className="text-lg font-medium text-slate-900">No categories yet</p>
        <p className="text-sm text-slate-500 mt-1">Create a category to organize your tasks</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4"
        >
          <div className="flex items-center gap-3">
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className="font-medium text-slate-900">{category.name}</span>
            <span className="text-sm text-slate-500">
              {taskCounts[category.id] || 0} tasks
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(category)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(category.id)} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
}
