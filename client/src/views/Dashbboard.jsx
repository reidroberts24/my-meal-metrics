// Dashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NutritionTargetsForm from '../components/NutritionTargetsForm';

const Dashboard = () => {
  const [userGoals, setUserGoals] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/goals/', { withCredentials: true })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setUserGoals(res.data[0]);
        }
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Error fetching goals:', err);
        setIsLoaded(true);
      });
  }, []);

  const handleGoalsSubmit = (goalsData) => {
    // Check if userGoals has an _id to determine if goals exist
    if (userGoals._id) {
      // Update existing goals
      axios.patch(`http://localhost:8000/api/goals/${userGoals._id}`, goalsData, { withCredentials: true })
        .then((res) => {
          console.log('Goal update successful', res.data);
        })
        .catch((err) => {
          console.error('Error updating goals:', err);
        });
    } else {
      // Create new goals
      axios.post('http://localhost:8000/api/goals/', goalsData, { withCredentials: true })
        .then((res) => {
          console.log('Goal creation successful', res.data);
          // Update userGoals state with the newly created goals
          setUserGoals(res.data);
        })
        .catch((err) => {
          console.error('Error creating goals:', err);
        });
    }
  };

  const handleDeleteGoals = () => {
    if (userGoals._id) {
      // Delete existing goals
      axios.delete(`http://localhost:8000/api/goals/${userGoals._id}`, { withCredentials: true })
        .then((res) => {
          console.log('Goals deleted successfully', res.data);
          setUserGoals({}); // Clear userGoals state after deletion
        })
        .catch((err) => {
          console.error('Error deleting goals:', err);
        });
    }
  };

  return (
    <div>
      <NutritionTargetsForm
        onSubmit={ handleGoalsSubmit }
        onDelete={ handleDeleteGoals }
        initialValues={userGoals} // Pass userGoals as initial values for the form
      />
      {userGoals._id && (
        <button onClick={handleDeleteGoals}>Delete Goals</button>
      )}
    </div>
  );
};

export default Dashboard;
