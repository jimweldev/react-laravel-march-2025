import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import App from './App.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="264357646431-h94qfkhietkh62c234do423160s9nd45.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster expand={true} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
