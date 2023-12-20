import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import MainLayout from "./layout/MainLayout"
import About from "./pages/About"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home />} exact/>  
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
