import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Typography } from '@mui/material';

const WeeklyMealStats = ({ userMeals, userGoals }) => {
    const [data, setData] = useState(null);
    const [averages, setAverages] = useState(null);

    useEffect(() => {
        const last7DaysData = calculateLast7DaysData(userMeals);
        const chartData = prepareChartData(last7DaysData, userGoals);
        setData(chartData);
        setAverages(calculateAverages(last7DaysData))
        console.log(averages)
    }, [userMeals, userGoals]);

  const calculateLast7DaysData = (userMeals) => {
    const last7DaysData = [];
    const currentDate = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - i); // subtract days
        const dailyMeals = userMeals.filter((meal) => {
        const mealDate = new Date(meal.created_at);
        return (
            mealDate.getDate() === date.getDate() &&
            mealDate.getMonth() === date.getMonth() &&
            mealDate.getFullYear() === date.getFullYear()
        );
    });

    const dailyTotals = {
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
    };    

    dailyMeals.forEach((meal) => {
        dailyTotals.calories += meal.calories || 0;
        dailyTotals.protein += meal.protein || 0;
        dailyTotals.fat += meal.fat || 0;
        dailyTotals.carbs += meal.carbs || 0;
    });

    last7DaysData.push(dailyTotals);
    }

    return last7DaysData;
    };

    const prepareChartData = (last7DaysData, userGoals) => {
    const chartData = {};

    for (const attribute of ['calories', 'protein', 'fat', 'carbs']) {
        const dataPoints = last7DaysData.map((dailyTotal) => dailyTotal[attribute]);

        chartData[attribute] = {
            labels: ['Day 7', 'Day 6', 'Day 5', 'Day 4', 'Day 3', 'Day 2', 'Today'],
            datasets: [
            {
                label: `${attribute.charAt(0).toUpperCase() + attribute.slice(1)} by Day`,
                data: dataPoints,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: `Daily ${attribute.charAt(0).toUpperCase() + attribute.slice(1)} Goal`,
                data: Array(7).fill(userGoals[`daily${attribute.charAt(0).toUpperCase() + attribute.slice(1)}`] || 0),
                fill: false,
                borderColor: 'rgba(255, 99, 132, 0.6)',
            },
            ],
            }

        };
    
    return chartData;
  };

    const calculateAverages = (last7DaysData) => {
        const averagesData = {};

        for (const attribute of ['calories', 'protein', 'fat', 'carbs']) {
        const total = last7DaysData.reduce((acc, dailyTotal) => acc + dailyTotal[attribute], 0);
        const average = total / 7; // Calculate the average for the last 7 days

        averagesData[attribute] = average;
        }

        return averagesData;
    };

    if (!data || !averages) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <h3>Past 7 Days Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
                {['calories', 'protein', 'fat', 'carbs'].map((attribute) => (
                <div key={attribute} style={{ flex: '1', minWidth: '300px', marginRight: '16px' }}>
                    <h4>{attribute.charAt(0).toUpperCase() + attribute.slice(1)}</h4>
                    <Line data={data[attribute]} />
                    <Typography variant="body3">
                        Daily avg: {Math.round(averages[attribute])}
                    </Typography>
                </div>
                ))}
            </div>
        </div>
    );
    
};

export default WeeklyMealStats;
