// app.js
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize, Employee } = require('./database');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('EMS'));


// GET route
app.get("/", async (req, res) => {
  const employees = await Employee.findAll();
  res.render("home", { data: employees });
});

// POST route for adding employee
app.post("/", async (req, res) => {
  const { employeeName, employeePost, employeeSalary } = req.body;

  if (!employeeName.trim()) {
    console.log("Error: Employee name is mandatory and cannot be empty.");
    return res.status(400).json({ error: "Employee name is mandatory." });
  }

  try {
    await Employee.create({ employeeName, employeePost, employeeSalary: parseInt(employeeSalary) });
    const employees = await Employee.findAll();
    res.json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding the employee." });
  }
});

// POST route for updating employee
app.post("/update", async (req, res) => {
  const { employeeId, employeeName, employeePost, employeeSalary } = req.body;

  if (!employeeName.trim()) {
    console.log("Error: Employee name is mandatory and cannot be empty.");
    return res.status(400).json({ error: "Employee name is mandatory." });
  }

  try {
    await Employee.update(
      { employeeName, employeePost, employeeSalary: parseInt(employeeSalary) },
      { where: { employeeId } }
    );
    const employees = await Employee.findAll();
    res.json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the employee." });
  }
});

// POST route for deleting employee
app.post("/delete", async (req, res) => {
  const { employeeId } = req.body;

  try {
    await Employee.destroy({ where: { employeeId } });
    const employees = await Employee.findAll();
    res.json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the employee." });
  }
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});