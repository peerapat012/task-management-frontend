import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListTodo, Tags, Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  open: boolean;
  onClose?: () => void;
}

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/tasks', icon: ListTodo, label: 'All Tasks' },
  { to: '/categories', icon: Tags, label: 'Categories' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-full w-60 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 lg:justify-start">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <ListTodo className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold">TaskFlow</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-900">Need help?</p>
            <p className="mt-1 text-xs text-slate-500">Check our docs</p>
          </div>
        </div>
      </aside>
    </>
  );
}
