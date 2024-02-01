import {Router} from 'express';
import mysqlDb from '../mysqlDb';

const officeRouter = Router();

officeRouter.get('/items', async (req, res, next) => {
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT i.id, i.name, c.id category_id, c.name category_name, p.id place_id, p.name place_name FROM items i ' +
      'LEFT JOIN office.categories c on c.id = i.category_id ' +
      'LEFT JOIN office.places p on p.id = i.place_id');
    res.send(results);
  } catch (e) {
    return next(e);
  }
});
officeRouter.get('/places', async (req, res, next) => {
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT id, name FROM places');
    res.send(results);
  } catch (e) {
    return next(e);
  }
});
officeRouter.get('/categories', async (req, res, next) => {
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT id, name FROM categories');
    res.send(results);
  } catch (e) {
    return next(e);
  }
});



export default officeRouter;