import { CheckCircle, Clock, AlertCircle, ListTodo } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardsProps {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  todayTasks: number;
}

export function StatsCards({ totalTasks, completedTasks, overdueTasks, todayTasks }: StatsCardsProps) {
  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: ListTodo,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Overdue',
      value: overdueTasks,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Due Today',
      value: todayTasks,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`rounded-full p-2 ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
