import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Admin from './Component/Admin';
import User from './Component/User';
// import AdminCategoriesPage from './Pages/AdminCategoriesPage'; 
import UserPage from './Pages/UserPage';
import NotificationPage from './Pages/NotificationPage';
import './App.css';
import AttendeesPage from './Pages/AttendeesPage';
import TablePage from './Pages/TablePage';
import SouthIndian from './Pages/SouthIndian';
import NorthIndian from './Pages/NorthIndian';
import Thali from './Pages/Thali';
// import AdminSouth from './Pages/AdminSouth';
// import AdminNorth from './Pages/AdminNorth';
import AdminCategoriesPage from './Pages/AdminCategoriesPage';
import AdminSubcategoriesPage from './Pages/AdminSubCategories';
import AdminItemsPage from './Pages/AdminItemsPage';

const App: React.FC = () => {

  return (
    <>
      <Router>
        <Routes>
          {/* Main routes */}
          <Route path='/' element={<Login />} />

          {/* <Route path='/login' element={<Login />} /> */}

          <Route path='/signup' element={<Signup />} />

          <Route path='/admin' element={<Admin />}>
          <Route path='category' element={<AdminCategoriesPage />} />
          <Route path='subcategory' element={<AdminSubcategoriesPage />} />
          <Route path='items' element={<AdminItemsPage />} />
          <Route path='attendees' element={<AttendeesPage/>} />

          <Route path='table' element={<TablePage/>} />

          </Route>

          
          <Route path='/user' element={<User />}>
            <Route index element={<UserPage />} />  
            <Route path='home' element={<UserPage />} />  
            <Route path='south' element={<SouthIndian/>} />
            <Route path='north' element={<NorthIndian/>} />
            <Route path='thali' element={<Thali/>}/>
            <Route path='notifications' element={<NotificationPage />} />
          </Route>

         
          <Route path='*' element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
