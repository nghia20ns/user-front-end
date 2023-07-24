import { publicRoutes } from "./routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./Components/Layout";
import { Fragment } from "react";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout === null ? Fragment : DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
