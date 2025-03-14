import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
// import App from './App.tsx'
import Root, { loader as rootLoader, action as rootAction, } from "./routes/root";
import Contact, { loader as contactLoader, action as contactAction, } from "./routes/contact";
import Home from "./routes/home/index";
import Login from "./routes/login";
import Register from "./routes/register";
import Base from "./routes/base";
import Game0 from "./routes/game/game0";
import Game1 from "./routes/game/game1";
import Game2 from "./routes/game/game2";
import Game3 from "./routes/game/game3";

import Game4 from "./routes/game/game4";
import DigitalCollectionPage from "./routes/nft/index";
import BlogCreate from "./routes/blog/create";
import BlogPreview from "./routes/blog/preview";
import BlogUpdate from "./routes/blog/update";

import ErrorPage from "./error-page";
import Index from "./routes/index";
import MainLayout from '@/layouts/MainLayout'

import EditContact, {
  action as editAction,
} from "./routes/edit";
import './index.css'
import { action as destroyAction } from "./routes/destroy";
const router = createHashRouter([
  // {
  //   path: "/home",
  //   element: <Root />,
  //   errorElement: <ErrorPage />,
  //   loader: rootLoader,
  //   action: rootAction,
  //   children: [
  //     {
  //       errorElement: <ErrorPage />,
  //       children: [
  //         { index: true, element: <Index /> },
  //         {
  //           path: "contacts/:contactId",
  //           element: <Contact />,
  //           loader: contactLoader,
  //           action: contactAction
  //         },
  //         {
  //           path: "contacts/:contactId/edit",
  //           element: <EditContact />,
  //           loader: contactLoader,
  //           action: editAction,
  //         },
  //         {
  //           path: "contacts/:contactId/destroy",
  //           action: destroyAction,
  //           errorElement: <div>Oops! There was an error.</div>,
  //         }
  //         /* the rest of the routes */
  //       ],
  //     }
  //   ],
  // },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/base",
    element: <Base />,
  },
  {
    path: "/nft",
    element: <MainLayout />,
    children: [
      {
        path: "digitalCollectionPage",
        element: <DigitalCollectionPage />,
      },]

  },
  {
    path: "/game",
    element: <MainLayout />,
    children: [
      {
        path: "game0",
        element: <Game0 />,
      },
      {
        path: "game1",
        element: <Game1 />,
      },
      {
        path: "game2",
        element: <Game2 />,
      },
      {
        path: "Game3",
        element: <Game3 />,
      },
      {
        path: "game4",
        element: <Game4 />,
      },
    ]
  },

  {
    path: 'blog',
    element: <MainLayout />,
    children: [
      {
        path: "create",
        element: <BlogCreate />,
      },
      {
        path: ":id",
        element: <BlogPreview />,
      },
      {
        path: "update/:id",
        element: <BlogUpdate />,
      }
    ]
  },
  {
    path: "*",
    element: <Home />,
  }
  // {
  //   path: "contacts/:contactId",
  //   element: <Contact />,
  // }
]);

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={{
    token: {
      // Seed Token，影响范围大
      colorPrimary: '#0B49D2',
      borderRadius: 2,
      fontFamily: 'font-serif'
      // 派生变量，影响范围小
    },
  }}>
    <RouterProvider router={router} />
  </ConfigProvider>
);