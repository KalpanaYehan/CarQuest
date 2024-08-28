import React from 'react'
import{Routes,Route} from 'react-router-dom'
import CarList from './pages/CarList'
import ShowCar from './pages/ShowCar'
import DeleteCar from './pages/DeleteCar'
import EditCar from './pages/EditCar'
import CreateCar from './pages/CreateCar'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/'element={<Home/>}></Route>
        <Route path='/cars/carlist' element={<CarList/>}></Route>
        <Route path='/cars/create' element={<CreateCar/>}></Route>
        <Route path='/cars/edit/:id' element={<EditCar/>}></Route>
        <Route path='/cars/details/:id' element={<ShowCar/>}></Route>
        <Route path='/cars/delete/:id' element={<DeleteCar/> }></Route>
      </Routes>
      
    </div>
  )
}

export default App
