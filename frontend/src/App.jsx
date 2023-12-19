import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import MainLayout from "./layout/MainLayout"
import About from "./pages/About"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home />} />  
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
