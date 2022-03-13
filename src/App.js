import "./App.css";
import Home from "./Components/Home/index";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import AddGateway from "./Components/GatewayAdd/index";
import EditGtw from "./Components/GatewayEdit/index";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-gateway" element={<AddGateway />} />
        <Route path="/edit-gateway/:id" element={<EditGtw />} />
      </Routes>      
    </Router >
  );
};

export default App;
