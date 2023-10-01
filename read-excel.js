const xlsx = require('xlsx');
const workbook = xlsx.readFile('player_data.xlsx');
const sheetName = workbook.SheetNames[0];
const playerData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

console.log(playerData);
