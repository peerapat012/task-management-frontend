import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Category } from '@/types';

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  color: z.string().min(1, 'Color is required'),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
  onSave: (data: { name: string; color: string }) => void;
}

const colorOptions = [
  '#EF4444', // red
  '#F59E0B', // amber
  '#10B981', // emerald
  '#3B82F6', // blue
  '#8B5CF6', // violet
  '#EC4899', // pink
  '#6366F1', // indigo
  '#14B8A6', // teal
];

export function CategoryModal({ open, onOpenChange, category, onSave }: CategoryModalProps) {
  const [selectedColor, setSelectedColor] = useState(category?.color || colorOptions[0]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || '',
      color: category?.color || colorOptions[0],
    },
  });

  useEffect(() => {
    if (category) {
      setSelectedColor(category.color);
    } else {
      setSelectedColor(colorOptions[0]);
    }
  }, [category, open]);

  const onSubmit = (data: CategoryFormData) => {
    onSave({ ...data, color: selectedColor });
    reset();
    onOpenChange(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
      setSelectedColor(colorOptions[0]);
    }
    onOpenChange(isOpen);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setValue('color', color);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          <DialogDescription>
            {category ? 'Update the category details below.' : 'Fill in the details to create a new category.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter category name"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorSelect(color)}
                    className={`h-8 w-8 rounded-full transition-transform ${
                      selectedColor === color ? 'ring-2 ring-offset-2 ring-slate-400 scale-110' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <input type="hidden" {...register('color')} value={selectedColor} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{category ? 'Save Changes' : 'Create Category'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
