import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login/Login";
import { UserStorage } from "./Hooks/UserContext";
import User from "./Components/User/User";
import ProdectedRouter from "./Components/Helper/ProdectedRouter";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <ProdectedRouter path="conta/*" element={<User />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </>
  );
}

export default App;
