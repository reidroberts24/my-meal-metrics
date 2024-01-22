import React from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Ensure you are using the correct import for your Chart.js version
import { Grid, Paper, Typography } from '@mui/material';

const DailyMealStats = ({ userMeals, userGoals }) => {
    // Filter today's meals
    const getTodayStart = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    };

    const todayMeals = userMeals.filter(meal => {
        const mealDate = new Date(meal.created_at);
        mealDate.setHours(0, 0, 0, 0);
        const todayStart = getTodayStart();
        return mealDate.getTime() === todayStart.getTime();
    });

    // Calculate total sum for each attribute
    const attributeSums = todayMeals.reduce((sums, meal) => {
        sums.calories += meal.calories;
        sums.protein += meal.protein;
        sums.fat += meal.fat;
        sums.carbs += meal.carbs;
        return sums;
    }, { calories: 0, protein: 0, fat: 0, carbs: 0 });


    // Function to create data for pie chart
    const createChartData = (attribute) => {
        const goalAttr = `daily${attribute.charAt(0).toUpperCase() + attribute.slice(1)}`;
        const goal = userGoals[goalAttr] || 1; // Avoid division by zero
        const achieved = attributeSums[attribute] || 0;
        const achievedPercentage = (achieved / goal) * 100;
        let remainingPercentage;
        if (achievedPercentage <= 100) {
            remainingPercentage = 100 - achievedPercentage;
        } else {
            remainingPercentage = 0
        }
    return {
        labels: ['Remaining', 'Consumed'],
        datasets: [{
        data: [remainingPercentage, achievedPercentage],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
        }]
    };
  };
  
    
    return (
        <div>
            <h3>Today's Meal Stats</h3>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {['calories', 'protein', 'fat', 'carbs'].map((attribute) => (
                <div key={attribute} style={{ flex: '1', minWidth: '200px', marginRight: '16px' }}>
                    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}> {/* Add marginBottom */}
                    <Typography variant="h6">
                        {attribute.charAt(0).toUpperCase() + attribute.slice(1)} {/* Capitalize first letter */}
                    </Typography>
                    <Pie data={createChartData(attribute)} />
                    <Typography variant="body3">
                        {attribute.charAt(0).toUpperCase() + attribute.slice(1)} today: {attributeSums[attribute]}
                    </Typography>
                    <br/>
                    <Typography variant="body3">
                        Goal: {userGoals[`daily${attribute.charAt(0).toUpperCase() + attribute.slice(1)}`] || 0}
                    </Typography>
                    </Paper>
                </div>
                ))}
            </div>
        </div>
    );
};

export default DailyMealStats;