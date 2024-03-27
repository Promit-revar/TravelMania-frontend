import HotelPageComponent from "./pages/hotelPage";
import NavBarComponent from "./components/Navbar/Navbar";
import HomePageComponent from "./pages/HomePage";
import RoomInfoComponent from "./components/RoomInfo/RoomInfoComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { HotelContextProvider } from "./Context/hotelDetailsContext";

function App() {
  return (
    <HotelContextProvider>
      <NavBarComponent />
      <hr />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageComponent />} />
        <Route path="hotel-details" element={<HotelPageComponent />} />
        <Route path='room' element={<RoomInfoComponent />} />
      </Routes>
    </BrowserRouter>
      
    </HotelContextProvider>
  );
}

export default App;
