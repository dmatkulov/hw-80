import express from 'express';
import cors from 'cors';
import mysqlDb from './mysqlDb';
import categoriesRouter from './routers/categories';
import placesRouter from './routers/places';
import itemsRouter from './routers/items';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/categories', categoriesRouter);
app.use('/places', placesRouter);
app.use('/items', itemsRouter);

const run = async () => {
  await mysqlDb.init();
  
  app.listen(port, () => {
    console.log('Server started on ' + port + ' port');
  });
};

run().catch(console.error);