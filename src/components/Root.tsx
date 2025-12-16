import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { HomePage } from "../pages/HomePage";
import type { RouteConfig } from './types/typedefs'
import App from "../App";
import { NotFoundPage } from "../pages/NotFoundPage";
export function Root() { 

const mainRouteConfig: RouteConfig[] = [
  { index: true, element: <HomePage/> },
  { path: 'solutions', element: <HomePage/> },
  { path: 'technology', element: <HomePage/> },
  { path: 'about', element: <HomePage/> },
  { path: 'careers', element: <HomePage/> },
  { path: 'resources', element: <HomePage/> },
  { path: 'contact', element: <HomePage/> },
  { path: '*', element: <NotFoundPage/>}
];
return (
          <Router>
        <Routes>
          <Route path="/" element={<App />}>
            {mainRouteConfig.map((route: RouteConfig, index: number) =>
              route.index ? (
                <Route key={index} index element={route.element} />
              ) : (
                <Route key={index} path={route.path} element={route.element} />
              ),
            )}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
  )
}