import express from 'express';
import cors from 'cors';
import officeRouter from './routers/officeItems';
import mysqlDb from './mysqlDb';


const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/', officeRouter);

const run = async () => {
  await mysqlDb.init();
  
  app.listen(port, () => {
    console.log('Server started on ' + port + ' port');
  });
};

run().catch(console.error);