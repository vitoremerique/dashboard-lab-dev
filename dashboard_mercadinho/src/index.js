import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import {createBrowserRouter } from 'react-router-dom';
import { RouterProvider,BrowserRouter } from 'react-router-dom';

import Sighin from './Pages/Sighin';
import Dashboard from './Pages/Dashboard';
import Products from './Pages/Products';
import Sales from './Pages/Sales';
import RegisterProduct from './Pages/Register-product';
import App from './App';
import Categories from './Pages/Categories';
import Inventories from './Pages/Inventories';



export const  router = createBrowserRouter([
  { 
    path:"/" ,
    element:<App/>,
    children:[ 
      { path:"/" ,
      element:<Dashboard/>
      },
      { path:"/sighin" ,
      element:<Sighin/>
      },
      { path:"/products" ,
      element:<Products/>
      },
      { path:"/sales" ,
      element:<Sales/>
      },
      { path:"/registerProduct" ,
      element:<RegisterProduct/> 
      }   
    ]
  } 

])



export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/sighin" element={<Sighin/>}/>
            <Route path="/products" element={<Products/>} />
            <Route path="/sales" element={<Sales/>} />
            <Route path="/categories" element={<Categories/>} />
            <Route path="/inventories" element={<Inventories/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Routers/>
  

);