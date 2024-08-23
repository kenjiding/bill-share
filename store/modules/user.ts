import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type User = {
  id: string,
  phone: string
  email: string
}

type State = {
  user: User
}

type Action = {
  updateUserInfo: (userState: User) => void
}

// Create your store, which includes both state and (optionally) actions
export const useUserStore = create<State & Action>()(
  immer(
    (set) => ({
      user: {
        id: '1234567890',
        phone: '7837434599',
        email: 'jissdsfd243@gmail.com',
      },
      updateUserInfo: (data: User) => set((state) => {
        state.user = data;
      }),
    })
  )
);

