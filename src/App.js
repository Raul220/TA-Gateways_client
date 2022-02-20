import "./App.css";
import Home from "./Components/Home/index";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>      
    </Router >
  );
};

export default App;
