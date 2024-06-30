import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home, Login, Course, Protected } from "./app/index";

import { Quiz } from "./app/Course/components";

import { store } from "./store";
import { Provider } from "react-redux";
import { RootProvider } from "./app/RootProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootProvider />,
    errorElement: <div>Router error...</div>,
    children: [
      {
        index: true,
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/course?/:courseId",
        element: (
          <Protected>
            <Outlet />
          </Protected>
        ),
        children: [
          { index: true, element: <Course /> },
          { path: "quiz", element: <Quiz /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
