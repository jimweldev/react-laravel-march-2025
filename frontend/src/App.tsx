import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import AdminLayout from './_layouts/private/admin/admin-layout';
import ExamplesLayout from './_layouts/private/examples/examples-layout';
import MainLayout from './_layouts/private/main/main-layout';
import PrivateLayout from './_layouts/private/private-layout';
import SettingsLayout from './_layouts/private/settings/settings-layout';
import PublicLayout from './_layouts/public/public-layout';
import DashboardPage from './_pages/private/admin/dashboard/dashboard-page';
import RbacPage from './_pages/private/admin/rbac/rbac-page';
import UsersPage from './_pages/private/admin/users/users-page';
import ButtonsPage from './_pages/private/examples/buttons-page';
import CardsPage from './_pages/private/examples/cards-page';
import EditorPage from './_pages/private/examples/editor-page';
import InputsPage from './_pages/private/examples/inputs-page';
import CardTabsPage from './_pages/private/examples/tabs/card-tabs-page';
import PageTabsPage from './_pages/private/examples/tabs/page-tabs-page';
import TextsPage from './_pages/private/examples/texts-page';
import PasswordPage from './_pages/private/settings/password-page';
import ProfilePage from './_pages/private/settings/profile/profile-page';
import ThemePage from './_pages/private/settings/theme-page';
import LoginPage from './_pages/public/login/login-page';
import useAuthUserStore from './_stores/auth-user.store';

const App = () => {
  const { token } = useAuthUserStore();

  // public routes
  const publicRoutes = [
    {
      element: <PublicLayout />,
      children: [
        {
          path: 'login',
          element: <LoginPage />,
        },
      ],
    },
    {
      path: '*',
      element: <h1>not found</h1>,
    },
  ];

  // private routes
  const privateRoutes = [
    {
      path: '',
      element: <PrivateLayout />,
      children: [
        // main layout
        {
          path: '/',
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <h1>Home</h1>,
            },
          ],
        },

        // admin layout
        {
          path: 'admin',
          element: <AdminLayout />,
          children: [
            {
              index: true,
              element: <DashboardPage />,
            },
            {
              path: 'users',
              children: [
                {
                  index: true,
                  element: <UsersPage />,
                },
                {
                  path: ':userTab',
                  element: <UsersPage />,
                },
              ],
            },
            {
              path: 'rbac',
              element: <RbacPage />,
            },
          ],
        },

        // examples layout
        {
          path: 'examples',
          element: <ExamplesLayout />,
          children: [
            {
              index: true,
              element: <CardsPage />,
            },
            {
              path: 'buttons',
              element: <ButtonsPage />,
            },
            {
              path: 'inputs',
              element: <InputsPage />,
            },
            {
              path: 'tabs',
              children: [
                {
                  index: true,
                  element: <PageTabsPage />,
                },
                {
                  path: 'cards',
                  element: <CardTabsPage />,
                },
              ],
            },
            {
              path: 'editor',
              element: <EditorPage />,
            },
            {
              path: 'texts',
              element: <TextsPage />,
            },
          ],
        },

        // settings
        {
          path: 'settings',
          element: <SettingsLayout />,
          children: [
            {
              index: true,
              element: <Navigate to="profile" replace />,
            },
            {
              path: 'profile',
              element: <ProfilePage />,
            },
            {
              path: 'password',
              element: <PasswordPage />,
            },
            {
              path: 'theme',
              element: <ThemePage />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <h1>not found</h1>,
    },
  ];

  const router = createBrowserRouter(token ? privateRoutes : publicRoutes);

  return <RouterProvider router={router} />;
};

export default App;
