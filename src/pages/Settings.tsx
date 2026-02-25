import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, LogOut, Trash2, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const updatedUser = { ...user!, name, email };
    localStorage.setItem('taskflow_user', JSON.stringify(updatedUser));
    setIsSaving(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      localStorage.removeItem('taskflow_user');
      localStorage.removeItem('taskflow_auth');
      localStorage.removeItem('taskflow_tasks');
      localStorage.removeItem('taskflow_categories');
      logout();
      navigate('/login');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile
          </CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatar || ''} alt={user?.name} />
              <AvatarFallback className="text-lg">
                {user?.name ? getInitials(user.name) : 'U'}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Change Avatar</Button>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button onClick={handleSaveProfile} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Preferences
          </CardTitle>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Default Task View</p>
              <p className="text-sm text-slate-500">Choose how tasks are displayed</p>
            </div>
            <Button variant="outline" size="sm">List</Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Default Priority</p>
              <p className="text-sm text-slate-500">Set default priority for new tasks</p>
            </div>
            <Button variant="outline" size="sm">Medium</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            Account
          </CardTitle>
          <CardDescription>Manage your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Change Password</p>
              <p className="text-sm text-slate-500">Update your password</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="font-medium text-red-600">Delete Account</p>
              <p className="text-sm text-slate-500">Permanently delete your account</p>
            </div>
            <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>

          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
