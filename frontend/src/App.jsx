
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import EmployeesPage from "./pages/EmployeesPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="employees"
            element={<EmployeesPage />}
          />
          <Route
            path="departments"
            element={<DepartmentsPage />}
          />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="*"
            element={
              <main className="page-content">
                <h1>404 — Page not found</h1>
                <p>That page does not exist.</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
