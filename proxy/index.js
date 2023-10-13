import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get("/api/:stock", async (req, res) => {
  const { stock } = req.params;
  const response = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${stock}?interval=1d&range=5y`
  );
  const data = await response.json();
  res.json(data);
});

// app.get("/algo-results", async (req, res) => {
//   var currentDate = new Date();
//   var fiveYearsAgo = new Date();
//   fiveYearsAgo.setFullYear(currentDate.getFullYear() - 5);
//   var endDate = new Date(fiveYearsAgo);
//   endDate.setDate(fiveYearsAgo.getDate() + 420);
//   const interval = {
//     startDate: fiveYearsAgo.toISOString().split("T")[0].slice(0, 10),
//     endDate: endDate.toISOString().split("T")[0].slice(0, 10),
//   };

//   const response = await fetch("https://2995-104-196-177-193.ngrok.io/predict", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(interval),
//   });

//   const data = await response.json();
//   res.json(data);
// });

// app.get("/ai-results", async (req, res) => {
//   var currentDate = new Date();
//   var fiveYearsAgo = new Date();
//   fiveYearsAgo.setFullYear(currentDate.getFullYear() - 5);
//   var endDate = new Date(fiveYearsAgo);
//   endDate.setDate(fiveYearsAgo.getDate() + 420);
//   const interval = {
//     startDate: fiveYearsAgo.toISOString().split("T")[0].slice(0, 10),
//     endDate: endDate.toISOString().split("T")[0].slice(0, 10),
//   };

//   const response = await fetch("https://96e4-34-139-149-146.ngrok.io/predict", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(interval),
//   });

//   const data = await response.json();
//   res.json(data);
// });

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
