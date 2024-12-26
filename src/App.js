import EmployeeMangment from "./Components/EmployeeMangment";
import "./App.css";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  Switch,
} from "react-router-dom";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="employee" />} />
        <Route path="/employee" element={<EmployeeMangment />} />
      </Routes>
    </div>
  );
}

export default App;
