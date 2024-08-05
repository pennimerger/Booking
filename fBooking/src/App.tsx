import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import AddHotel from "./pages/AddHotel"
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel"
import Search from "./pages/Search"
import Detail from "./pages/Detail"
import Booking from "./pages/Booking"
import MyBookings from "./pages/MyBookings"
import Homepage from "./pages/Homepage"
import Recover from "./pages/Recover"
import ResetPassword from "./pages/ResetPassword"
import {useAppContext} from "./contexts/AppContext"

const App = () => {
  const {isLoggedIn} = useAppContext()
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>
          <Homepage />
        </Layout>} />
        <Route path="/search" element={
          <Layout>
          <Search />
        </Layout>
        } />
        <Route path="/reset-password" element={<Layout>
          <ResetPassword />
        </Layout>} />
        <Route path="/detail/:hotelId" element={
          <Layout>
          <Detail />
        </Layout>
        } />
        <Route path="/register" element={
          <Layout><Register /></Layout>
        } />
        <Route path="/sign-in" element={
          <Layout><SignIn /></Layout>
        } />
        <Route path="/recover" element={
          <Layout><Recover /></Layout>
        } />

        {isLoggedIn && (
          <>
            <Route path="/add-hotel" element={
              <Layout><AddHotel /></Layout>
            }
            />
            <Route path="/my-hotels" element={
              <Layout><MyHotels /></Layout>
            }
            />
            <Route path="/hotel/:hotelId/booking" element={
              <Layout><Booking /></Layout>
            }
            />
            <Route path="/my-bookings" element={
              <Layout><MyBookings /></Layout>
            }
            />
            <Route path="/edit-hotel/:hotelId" element={
              <Layout><EditHotel /></Layout>
            }
            />
          </>)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App