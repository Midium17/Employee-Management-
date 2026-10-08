import {
    BrowserRouter,
    Link,
    Route,
    Routes
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";


function App() {

    return (

        <BrowserRouter>

            <div className="app">

                <aside className="sidebar">

                    <h2>
                        EmployeeMS
                    </h2>


                    <nav>

                        <Link to="/">
                            Dashboard
                        </Link>

                        <Link to="/employees">
                            Employees
                        </Link>

                    </nav>

                </aside>


                <main className="main">

                    <Routes>

                        <Route
                            path="/"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/employees"
                            element={<Employees />}
                        />

                    </Routes>

                </main>

            </div>

        </BrowserRouter>
    );
}

export default App;