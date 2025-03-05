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
import ErrorPage from "./error-page";
import Index from "./routes/index";
import EditContact, {
  action as editAction,
} from "./routes/edit";
import './index.css'
import { action as destroyAction } from "./routes/destroy";
const router = createHashRouter([
  {
    path: "/home",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          }
          /* the rest of the routes */
        ],
      }
    ],
  },
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