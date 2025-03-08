import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the user type
interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthUserState {
  user: User | null;
  token: string | null;
  setAuthUser: (user: User, token: string) => void;
  clearAuthUser: () => void;
}

const useAuthUserStore = create<AuthUserState>()(
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
