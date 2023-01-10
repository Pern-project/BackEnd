const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const dotenv = require("dotenv");
//middelware
app.use(cors());
app.use(express.json());
dotenv.config();
//ROUTES

//TEST

app.get("/test", (req, res) => {
  res.send("helloooo");
});
//CREATE EMPLOYEE

app.post("/employee", async (req, res) => {
  try {
    const { description } = req.body;
    const newEmployee = await pool.query(
      "INSERT INTO employees (description) VALUES($1) RETURNING * ",
      [description]
    );
    res.json(newEmployee.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//GET ALL EMPLOYEE

app.get("/getemployee", async (req, res) => {
  try {
    const allEmployees = await pool.query("SELECT * FROM EMPLOYEES");
    res.json(allEmployees.rows);
  } catch (error) {
    console.error(err.message);
  }
});

//GET A EMPLOYEE

app.get("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await pool.query(
      "SELECT * FROM employees WHERE employee_id=$1",
      [id]
    );
    res.json(employee.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});

//UPDATE A EMPLOYEE

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateEmployee = await pool.query(
      "UPDATE employees SET description = $1 WHERE employee_id =$2",
      [description, id]
    );
    res.json("employee was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE A EMPLOYEE

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await pool.query(
      "DELETE FROM employees WHERE employee_id = $1",
      [id]
    );
    res.json("Employee was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server starting at port number ${PORT}`);
});
