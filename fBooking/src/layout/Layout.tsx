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
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
       <Hero /> 
       <div className="container mx-auto">
        {location.pathname !== "/recover" && <SearchBar />}
      </div> 
       <div className="container mx-auto py-10 flex-1">{children}</div> 
       <Footer /> 
    </div>
  )
}

export default Layout