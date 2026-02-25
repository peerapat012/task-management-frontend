import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Layout, Clock, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: Layout,
    title: 'Task Management',
    description: 'Organize your tasks with priorities, categories, and due dates. Stay on top of what matters most.',
  },
  {
    icon: Clock,
    title: 'Track Deadlines',
    description: 'Never miss a deadline again. Set due dates and get reminders for upcoming tasks.',
  },
  {
    icon: Users,
    title: 'Categories & Labels',
    description: 'Group your tasks by categories with custom colors for better organization.',
  },
  {
    icon: Zap,
    title: 'Quick Actions',
    description: 'Complete, edit, or delete tasks with a single click. Fast and efficient workflow.',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    content: 'TaskFlow has completely transformed how I manage my daily tasks. Simple yet powerful.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Freelancer',
    content: 'The clean interface and intuitive design help me stay focused on getting things done.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Team Lead',
    content: 'Finally, a task manager that works the way I think. Highly recommended!',
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6366F1]">
              <Check className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">TaskFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Organize your tasks with{' '}
              <span className="text-[#6366F1]">effortless simplicity</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              TaskFlow helps you stay productive with a clean, intuitive interface.
              Create tasks, set priorities, and track your progress — all in one place.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-[#6366F1] hover:bg-[#4F46E5]">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image / Preview */}
          <div className="mt-16">
            <div className="relative mx-auto max-w-5xl rounded-xl border border-slate-200 bg-slate-50 shadow-2xl">
              <div className="flex">
                {/* Sidebar preview */}
                <div className="w-56 rounded-l-xl border-r border-slate-200 bg-slate-100 p-4">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-6 w-6 rounded bg-[#6366F1]" />
                    <span className="font-semibold text-slate-900">TaskFlow</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 rounded bg-[#6366F1]/10 px-3 py-1.5 text-sm font-medium text-[#6366F1]">Dashboard</div>
                    <div className="h-8 rounded px-3 py-1.5 text-sm text-slate-600">All Tasks</div>
                    <div className="h-8 rounded px-3 py-1.5 text-sm text-slate-600">Categories</div>
                    <div className="h-8 rounded px-3 py-1.5 text-sm text-slate-600">Settings</div>
                  </div>
                </div>
                {/* Main content preview */}
                <div className="flex-1 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">All Tasks</h2>
                    <Button size="sm" className="bg-[#6366F1] hover:bg-[#4F46E5]">Add Task</Button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
                      <div className="h-5 w-5 rounded border-2 border-slate-300" />
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">Design landing page</p>
                        <div className="mt-1 flex gap-2">
                          <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">High</span>
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">Today</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
                      <div className="h-5 w-5 rounded border-2 border-green-500 bg-green-500" />
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 line-through text-slate-500">Review PR #42</p>
                        <div className="mt-1 flex gap-2">
                          <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Completed</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
                      <div className="h-5 w-5 rounded border-2 border-slate-300" />
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">Update documentation</p>
                        <div className="mt-1 flex gap-2">
                          <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">Medium</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to stay productive
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Simple features that help you focus on what matters most.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#6366F1]/10">
                  <feature.icon className="h-7 w-7 text-[#6366F1]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Loved by thousands
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              See what our users have to say about TaskFlow.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-slate-600">"{testimonial.content}"</p>
                <div className="mt-4">
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#6366F1] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get organized?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Start your free trial today. No credit card required.
          </p>
          <div className="mt-8">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="bg-white text-[#6366F1] hover:bg-slate-100">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6366F1]">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">TaskFlow</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2026 TaskFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
