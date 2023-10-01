const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/WEBPLA.html');
});

// In your server code
app.get('/read-excel', (req, res) => {
    const excelFilePath = path.join(__dirname, 'player_data.xlsx');
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet

    // Parse Excel data to JSON
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log(jsonData); // Add this line to log the data

    res.json(jsonData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
