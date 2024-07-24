import React, { Suspense, useEffect, useState } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RootLayout from './layouts/rootLayout';
import Home from './pages/home/Home';
import Admin from './pages/admin/Admin';
import Error from './pages/error/Error';
import AdminLayout from './layouts/adminLayout';

const LazyEdit = React.lazy(() => import('./pages/edit/Edit'));
const LazyCreate = React.lazy(() => import('./pages/create'));
const LazyEditItem = React.lazy(() => import('./pages/edit/EditItem'));
const LazyStudyPage = React.lazy(() => import('./pages/study/Study.tsx'));

import Loading from './components/loading/Loading';
import { auth } from './config/Firebase';
import { User, onAuthStateChanged } from 'firebase/auth';

function App() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const onSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    })

    return () => {
      onSubscribe();
    }
  }, [])

  // Verifica se o usuário está logado
  const isAuthenticated = !!user;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='study' element={<Suspense fallback={<Loading />}>{<LazyStudyPage />}</Suspense>} />
        <Route path='admin' element={<AdminLayout />}>
          {isAuthenticated ?
            <>
            <Route index element={<Admin />} />
            <Route path='create' element={<Suspense fallback={<Loading />}><LazyCreate /></Suspense>} />
            <Route path='edit' element={<Suspense fallback={<Loading />}><LazyEdit /></Suspense>} />
            <Route path={`:id`} element={<Suspense fallback={<Loading />}>{<LazyEditItem />}</Suspense>} />
            <Route path='*' element={<Error />} />
          </> :   <Route index element={<Admin />} />
          }
        </Route>

        <Route path='*' element={<Error />} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
