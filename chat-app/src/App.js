import { Fragment } from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Landing from "./components/Landing";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/Landing" element={<Landing/>}></Route>
          </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
