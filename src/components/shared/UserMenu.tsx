import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store/store';
import { logout } from '@/store/slices/authSlice';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { AuthDialogContent } from './AuthDialogContent';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { UserCheck } from 'lucide-react';

export const UserMenu = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  return !user ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="hover:bg-white! hover:text-green-600!">
          Sign In / Sign Up
        </Button>
      </DialogTrigger>
      <AuthDialogContent />
    </Dialog>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:text-green-400! hover:bg-white! text-green-600 text-xl font-bold "
        >
          <UserCheck />
          {user.username}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {user.username} <br />
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => dispatch(logout())} className="text-red-600">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
