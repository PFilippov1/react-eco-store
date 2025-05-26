import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
      message: 'Password must include letters and numbers, no spaces',
    }),
});

const registerSchema = loginSchema.extend({
  username: z.string().min(2, { message: 'Minimum 2 characters' }),
});

export default function AuthDialog() {
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '' },
  });
  //todo implement data sending to database
  const onLogin = (data: object) => console.log('Login:', data);
  const onRegister = (data: object) => console.log('Register:', data);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="pl-5 text-sm text-gray-500 cursor-pointer">Sign In/Sign Up</span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px] bg-white">
        <DialogHeader>
          <DialogTitle>Welcome</DialogTitle>
          <DialogDescription>Please sign in or sign up</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
              <Input placeholder="Email" {...loginForm.register('email')} />
              {loginForm.formState.errors.email && (
                <p className="text-red-500 text-sm">{loginForm.formState.errors.email.message}</p>
              )}
              <Input type="password" placeholder="Password" {...loginForm.register('password')} />
              {loginForm.formState.errors.password && (
                <p className="text-red-500 text-sm">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
              <Input placeholder="Username" {...registerForm.register('username')} />
              {registerForm.formState.errors.username && (
                <p className="text-red-500 text-sm">
                  {registerForm.formState.errors.username.message}
                </p>
              )}
              <Input placeholder="Email" {...registerForm.register('email')} />
              {registerForm.formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {registerForm.formState.errors.email.message}
                </p>
              )}
              <Input
                type="password"
                placeholder="Password"
                {...registerForm.register('password')}
              />
              {registerForm.formState.errors.password && (
                <p className="text-red-500 text-sm">
                  {registerForm.formState.errors.password.message}
                </p>
              )}
              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
