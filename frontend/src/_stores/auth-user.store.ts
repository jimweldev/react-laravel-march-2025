import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/_types/user';

interface AuthUserStoreProps {
  user: User | null;
  token: string | null;
  setAuthUser: (user: User, token: string) => void;
  clearAuthUser: () => void;
}

const useAuthUserStore = create<AuthUserStoreProps>()(
  persist(
    set => ({
      user: null,
      token: null,
      setAuthUser: (user, token) => set({ user, token }),
      clearAuthUser: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-user',
    },
  ),
);

export default useAuthUserStore;
