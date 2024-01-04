const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// conexao com o banco de dados
const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost:27017/Management';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});


//mapeando banco de dados
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: String,
  last_name: String,
  cpf: String,
  cnh: String,
  manager: String,
  gender: String,
});

const Employee = mongoose.model('employees', employeeSchema);

const managerSchema = new Schema({
  tag: Number,
  username: String,
  password: String,
  name: String,
  last_name: String,
  gender: String,
});

const Manager = mongoose.model('managers', managerSchema);




app.get("/", (req, res) => {
    res.render('index.ejs');
});


app.get("/home", (req, res) => {
    res.render('home.ejs');
});

app.get("/addEmployee", (req, res) => {
  res.render('add-employee.ejs');
});

app.get("/employees", async (req, res) => {
      const employees = await db.collection('employees').find().toArray();
      res.render('employees.ejs', { employees });
  });
  

app.post('/addEmployee', async (req, res) => {
    try {
      const { name, last_name, cpf, cnh, manager, gender } = req.body;
  
      const newEmployee = new Employee({
        name,
        last_name,
        cpf,
        cnh,
        manager,
        gender,
      });
  
      await newEmployee.save();
  
      res.redirect('/employees'); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    }
  });
  
  
  
  app.get('/deleteEmployee/:id', async (req, res) => {
    try {
    const employeeId = req.params.id;

    if (!mongoose.isValidObjectId(employeeId)) {
      return res.status(400).send('ID de funcionário inválido');
    }

    await Employee.findByIdAndDelete(employeeId);

    res.redirect('/employees'); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.get('/updateEmployee/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;

    if (!mongoose.isValidObjectId(employeeId)) {
      return res.status(400).send('ID de funcionário inválido');
    }

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).send('Funcionário não encontrado');
    }

    res.render('update-employee.ejs', { employee });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.post('/saveUpdatedEmployee', async (req, res) => {
  try {
    const { employee_id, name, last_name, cpf, cnh, manager, gender } = req.body;

    if (!mongoose.isValidObjectId(employee_id)) {
      return res.status(400).send('ID de funcionário inválido');
    }

    await Employee.findByIdAndUpdate(employee_id, {
      name,
      last_name,
      cpf,
      cnh,
      manager,
      gender,
    });

    res.redirect('/employees'); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Verificação de login para manager
app.post('/', async (req, res) => {
  const { username, password } = req.body;

  const manager = await db.collection('managers').findOne({ username, password });

  if (manager) {
    res.render('home.ejs');
  } else {
    res.render('index.ejs');
  }
});