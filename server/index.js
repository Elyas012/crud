const express= require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'empleados_crud'
});

//Consultas BDD
app.post("/create",(req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;   
  const pais = req.body.pais;
  const ocupacion = req.body.ocupacion;
  const anios = req.body.anios;

  const consulta= "INSERT INTO empleados (nombres, edad, pais, ocupacion, anios) VALUES (?, ?, ?, ?, ?)";
  db.query(consulta, [nombre, edad, pais, ocupacion, anios], (error, result) => {
  if (error) {
    console.log(error);
    res.status(500).send("Error en la consulta"); // opcional: responde con error
  } else {
    res.send(result);
  }
  });
});

// app.get("/empleados", (req, res) => {
//   const consulta = "SELECT * FROM empleados";
// });


//CONSULTA LISTA EMPLEADOS
app.get("/empleados",(req, res) => {
  db.query("SELECT * FROM empleados", (error, result) => {
  if (error) {
    console.log(error);
    res.status(500).send("Error en la consulta"); // opcional: responde con error
  } else {
    res.send(result);
  }
  });
});

//JSON CON REST
//XML CON SOFT

//actualizar segun id
app.put("/update",(req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const edad = req.body.edad;   
  const pais = req.body.pais;
  const ocupacion = req.body.ocupacion;
  const anios = req.body.anios;

  const consulta= "UPDATE empleados SET nombres=?, edad=?, pais=?, ocupacion=?, anios=? WHERE id=?";
  db.query(consulta, [nombre, edad, pais, ocupacion, anios, id], (error, result) => {
  if (error) {
    console.log(error);
    res.status(500).send("Error en la consulta"); // opcional: responde con error
  } else {
    res.send(result);
  }
  });
});

//ELIMINAR POR ID
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const consulta = "DELETE FROM empleados WHERE id = ?";
  db.query(consulta, [id], (error, result) => {
    if (error) {
      console.log("Error al eliminar:", error);
      res.status(500).send("Error al eliminar");
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});



