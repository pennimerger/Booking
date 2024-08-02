import Footer from "./Footer"
import Header from "./Header"
import Hero from "./Hero"

// type Props = {
//   resetLink: string
// }

const Mailer = (resetLink:string) => {
  
  return (
    <div className="flex flex-col min-h-screen">
      {/*<Header />*/}
       <Hero />
       <div className="container mx-auto py-10 flex-1">
        <p>Click the link below to reset your password:</p>
        <a href={resetLink}>Reset Password</a>
      </div> 
       <Footer /> 
    </div>
  )
}

export default Mailer