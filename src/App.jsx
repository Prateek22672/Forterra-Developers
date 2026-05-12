import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import GlobalBottomBlur from "./components/GlobalBottomBlur";

export default function App() {
  return (
    <BrowserRouter>
      <main className="relative bg-[#E8E5D8]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
        <GlobalBottomBlur />
      </main>
    </BrowserRouter>
  );
}