import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddVoters from "./MyDesign/AddVoters";
import Header from "./MyDesign/Header";
import Home from "./MyDesign/Home";
import SignIn from "./MyDesign/SignIn";
import Vote from "./MyDesign/VoteScreen";
import Create from "./MyDesign/Register";
import AddCandidate from "./MyDesign/AddCandidate";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/candidate" element={<AddCandidate />} />
          <Route path="/addcandidate" element={<AddVoters />} />
          <Route path="/register" element={<Create />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
