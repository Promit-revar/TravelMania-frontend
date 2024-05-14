import HotelPageComponent from "./pages/hotelPage";
import NavBarComponent from "./components/Navbar/Navbar";
import HomePageComponent from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { HotelContextProvider } from "./Context/hotelDetailsContext";
import { LoaderContextProvider } from "./Context/loaderContext";
import { HotelBookingContext, HotelBookingContextProvider } from "./Context/hotelBookingContext";
import OrderSummaryPage from "./pages/OrderSummary";

function App() {
  return (
    <HotelContextProvider>
      <LoaderContextProvider>
      <NavBarComponent />
      <hr />
      <BrowserRouter>
      <HotelBookingContextProvider>
      <Routes>
        <Route path="/" element={<HomePageComponent />} />
          <Route path="hotel-details" element={<HotelPageComponent />} />
          <Route path="order-summary" element={<OrderSummaryPage />} />
      </Routes>
      </HotelBookingContextProvider>
    </BrowserRouter>
    </LoaderContextProvider>
    </HotelContextProvider>
  );
}

export default App;
