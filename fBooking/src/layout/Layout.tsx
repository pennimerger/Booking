import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"
import SearchBar from "../components/SearchBar"
import {useLocation} from "react-router-dom"

interface Props {
  children: React.ReactNode
}

const Layout = ({children}:Props) => {
  const location = useLocation()
  const excludedPaths = ["/recover", "/sign-in", "/register", "/reset-password"]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
       <Hero /> 
       <div className="container mx-auto">
       {!excludedPaths.includes(location.pathname) && <SearchBar />}
      </div> 
       <div className="container mx-auto py-10 flex-1">{children}</div> 
       <Footer /> 
    </div>
  )
}

export default Layout