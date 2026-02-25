import { isPast, isToday } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { useTasks } from '@/contexts/TaskContext';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RecentTasks } from '@/components/dashboard/RecentTasks';
import { UpcomingDeadlines } from '@/components/dashboard/UpcomingDeadlines';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DashboardPage() {
  const { user } = useAuth();
  const { tasks, toggleTaskStatus } = useTasks();

  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const overdueTasks = tasks.filter(
    (t) => t.dueDate && isPast(new Date(t.dueDate)) && t.status === 'pending'
  ).length;
  const todayTasks = tasks.filter(
    (t) => t.dueDate && isToday(new Date(t.dueDate)) && t.status === 'pending'
  ).length;

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const upcomingTasks = tasks
    .filter((t) => t.dueDate && t.status === 'pending')
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.name || 'User'}!</h1>
        <p className="text-slate-500 mt-1">Here's an overview of your tasks</p>
      </div>

      <StatsCards
        totalTasks={tasks.length}
        completedTasks={completedTasks}
        overdueTasks={overdueTasks}
        todayTasks={todayTasks}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTasks tasks={recentTasks} onToggle={toggleTaskStatus} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <UpcomingDeadlines tasks={upcomingTasks} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
