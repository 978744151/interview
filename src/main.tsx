
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
// import App from './App.tsx'
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
import DigitalCollectionGoods from "./routes/nft/goods";
import NFTNotice from "./routes/nft/notice";

import BlogCreate from "./routes/blog/create";
import BlogPreview from "./routes/blog/preview";
import BlogList from "./routes/blog/index.tsx";

import BlogUpdate from "./routes/blog/update";
import { AliveScope, KeepAlive } from 'react-activation'

import ErrorPage from "./error-page";
import Index from "./routes/index";
import MainLayout from '@/layouts/MainLayout.tsx'
import zhCN from 'antd/locale/zh_CN';
import RootLayout from '@/layouts/RootLayout.tsx'


import './index.css'
const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/base",
        element: <Base />,
      },
      {
        path: "/nft",
        // element: <MainLayout />,
        children: [
          {
            path: "digitalCollectionPage",
            element: <KeepAlive><DigitalCollectionPage /></KeepAlive>,
          }, {
            path: "goods/:id",
            element: <DigitalCollectionGoods />,
          },
          {
            path: "notice",
            element: <NFTNotice />,
          },
        ]
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
          },

        ]
      },
      {
        path: "/blog/list",
        element: <BlogList />,
      },
      {
        path: "*",
        element: <Home />,
      }
      // {
      //   path: "contacts/:contactId",
      //   element: <Contact />,
      // }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={zhCN} theme={{
    token: {
      // Seed Token，影响范围大
      colorPrimary: '#0B49D2',
      borderRadius: 2,
      fontFamily: 'font-serif',
      // 派生变量，影响范围小
    },
  }}>
    <AliveScope>
      <RouterProvider router={router} />
    </AliveScope>
  </ConfigProvider>
);