import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type LoadingState = {
  loading: boolean;
  text?: string;
}

type GlobalState = {
  loadingData: LoadingState;
}

type Action = {
  updateLoading: (status: LoadingState) => void
}

export const useGlobalStore = create<GlobalState & Action>()(
  immer(
    (set) => ({
      loadingData: {
        loading: false,
        text: ''
      },
      updateLoading: (data) => set((state) => {
        state.loadingData.loading = data.loading;
        state.loadingData.text = data.text;
      }),
    })
  )
);

