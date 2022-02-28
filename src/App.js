import "./App.css";
import Home from "./Components/Home/index";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import AddGateway from "./Components/GatewayAdd/index";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-gateway" element={<AddGateway />} />
      </Routes>      
    </Router >
  );
};

export default App;
