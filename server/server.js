const cors = require('cors')
const express = require('express');
const app = express();
const PORT = 8000;

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.send('MyMealMetrics Backend is running!');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  