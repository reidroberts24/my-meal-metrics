import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NutritionTargetsForm from '../components/NutritionTargetsForm';


const Dashboard = () => {
  const navigate = useNavigate();    

  return (
    <>
    <NutritionTargetsForm/>
    </>
  );
};

export default Dashboard;
