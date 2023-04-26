import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./component/NotFound";
import Dashboard from "./component/Dashboard";
import Registration from "./component/Registration";
import Admin from "./component/Admin";
import RegistAdmin from "./component/RegistAdmin";
import Addtocart from "./component/Addtocart";
import Viewproduct from "./component/Viewproduct";
import Ordered from "./component/Ordered";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Ordered" element={<Ordered/>} />
        <Route path="/RegistAdmin" element={<RegistAdmin />} />
        <Route path="/Addtocart" element={<Addtocart />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Viewproduct" element={<Viewproduct />} />
        <Route path="/Dashboard" element={<Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
