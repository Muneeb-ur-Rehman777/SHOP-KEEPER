import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route,Router,Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './Component/Dashboard/Dashboard'
import Add from './Component/ADD/Add'
import Customer from './Component/CUSTOMER/CUSTOMER/Customers'
import Orders from './Component/ORDERS/Orders'
import Products from './Component/PRODUCTS/PRODUCTS/Products'
import Sales from './Component/SALES/Sales'
import Pending from './Component/CUSTOMER/PENDING/Pending'
import Vip from './Component/CUSTOMER/VIP/Vip'
import Total from './Component/CUSTOMER/TOTAL/Total'
import AddProducts from './Component/PRODUCTS/ADDPRODUCTS/AddProducts'
function App() {


  return (
    <>
    <Routes>
        <Route path='/'element={<Dashboard/>}/> 
        <Route path='/Add'element={<Add/>}/>
        <Route path='/Customer' element={<Customer/>}/>
        <Route path='/Orders' element={<Orders/>}/>
        <Route path='/Sales' element={<Sales/>}/>
        <Route path='/Products' element={<Products/>}/>
        <Route path='/Pending' element={<Pending/>}/>
        <Route path='/Vip' element={<Vip/>}/>
        <Route path='/Total' element={<Total/>}/>
        <Route path='/AddProducts' element={<AddProducts/>}/>
        
    </Routes>
      
    </>
  )
}

export default App
