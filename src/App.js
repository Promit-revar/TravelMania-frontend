import HotelPageComponent from "./pages/hotelPage";
import NavBarComponent from "./components/Navbar/Navbar";
import HomePageComponent from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { HotelContextProvider } from "./Context/hotelDetailsContext";
import { LoaderContextProvider } from "./Context/loaderContext";

function App() {
  return (
    <HotelContextProvider>
      <LoaderContextProvider>
      <NavBarComponent />
      <hr />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageComponent />} />
        <Route path="hotel-details" element={<HotelPageComponent />} />
      </Routes>
    </BrowserRouter>
    </LoaderContextProvider>
    </HotelContextProvider>
  );
}

export default App;
