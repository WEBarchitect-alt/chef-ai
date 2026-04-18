import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import Home from "./pages/Home";
import AIPage from "./pages/AIPage";
import RecipePage from "./pages/RecipePage";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai" element={<AIPage />} />
          <Route path="/recipe/:name" element={<RecipePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </motion.div>
    </BrowserRouter>
  );
}