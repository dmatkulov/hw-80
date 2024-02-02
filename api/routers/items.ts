import {Router} from 'express';
import mysqlDb from '../mysqlDb';
import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {imageUpload} from '../multer';
import {OfficeItemWithoutId} from '../types';

const itemsRouter = Router();
itemsRouter.get('/', async (req, res, next) => {
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT i.id, c.id category_id, p.id place_id, i.name, c.name category_name, p.name place_name FROM items i ' +
      'LEFT JOIN office.categories c on c.id = i.category_id ' +
      'LEFT JOIN office.places p on p.id = i.place_id');
    res.send(results);
  } catch (e) {
    return next(e);
  }
});

itemsRouter.get('/:id', async (req, res, next) => {
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT id, category_id, place_id, name, description, image FROM items WHERE items.id = ? ',
      [req.params.id]
    ) as RowDataPacket[];
    
    const item = results[0];
    
    if (!item) {
      return res.status(404).send({error: 'Item not found'});
    }
    
    res.send(item);
  } catch (e) {
    return next(e);
  }
});

itemsRouter.post('/', imageUpload.single('image'), async (req, res, next) => {
  try {
    const categoryId = req.body.categoryId;
    const placeId = req.body.placeId;
    const name = req.body.name;
    
    if (!categoryId && !placeId && !name) {
      return res.status(422).send({error: 'Category ID, Place ID and name must be present'});
    }
    
    const item: OfficeItemWithoutId = {
      categoryId: parseInt(req.body.categoryId),
      placeId: parseInt(req.body.placeId),
      name: req.body.name,
      description: req.body.description ? req.body.description : null,
      image: req.file ? req.file.filename : null
    };
    
    const [result] = await mysqlDb.getConnection().query(
      'INSERT INTO items (category_id, place_id, name, description, image)' +
      'VALUES (?, ?, ?, ?, ?)',
      [item.categoryId, item.placeId, item.name, item.description, item.image],
    ) as ResultSetHeader[];
    
    res.send({
      id: result.insertId,
      ...item,
    });
  } catch (e) {
    return next(e);
  }
});

itemsRouter.delete('/:id', async (req, res, next) => {
  const itemId = req.params.id;
  
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT * FROM items WHERE id = ? ',
      [itemId],
    ) as RowDataPacket[];
    
    const existingItem = results[0];
    
    if (!existingItem) {
      return res.status(404).send({error: 'Item not found'});
    }
    
    await mysqlDb.getConnection().query('DELETE FROM items WHERE id = ?', [itemId]);
    res.send({message: 'Item deleted successfully'});
  } catch (e) {
    return next(e);
  }
});

export default itemsRouter;