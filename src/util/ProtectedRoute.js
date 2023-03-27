import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';
import useAccountAuth from '../custom-hook/useAccountState';

const ProtectedRoute = () => {
    const {currentUser}=useAccountAuth();
   
    
    return currentUser?<Outlet /> :<Navigate to="/" />
    
}

export default ProtectedRoute