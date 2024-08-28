import React from 'react'
import Navbar from '../components/Navbar'
import About from '../components/About'
import Hero from '../components/Hero'
import Service from '../components/Service'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <Service/>
      <Footer/>
    </div>
  )
}

export default Home
