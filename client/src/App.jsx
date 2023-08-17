import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "../src/components/views/Landing/Landing";
import Home from "../src/components/views/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Details from "./components/views/Details/Details";
import { useLocation } from "react-router-dom";
import Form from "./components/views/Form/Form";
import NoUrl from "./components/404/NoUrl";

function App() {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Details />} />
        <Route path="/createDriver" element={<Form />} />
        <Route path="*" element={<NoUrl />} />
      </Routes>
    </div>
  );
}

export default App;
