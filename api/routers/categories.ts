import {Router} from 'express';
import mysqlDb from '../mysqlDb';
import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {Resource} from '../types';

const categoriesRouter = Router();
categoriesRouter.get('/', async (req, res, next) => {
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT id, name FROM categories');
    res.send(results);
  } catch (e) {
    return next(e);
  }
});

categoriesRouter.get('/:id', async (req, res, next) => {
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT id, name, description FROM categories WHERE categories.id = ? ',
      [req.params.id]
    ) as RowDataPacket[];
    
    const category = results[0];
    
    if (!category) {
      return res.status(404).send({error: 'Category not found!'});
    }
    
    res.send(category);
  } catch (e) {
    next(e);
  }
});

categoriesRouter.post('/', async (req, res, next) => {
  try {
    const name = req.body.name;
    
    if (!name) {
      return res.status(422).send({error: 'Category name must be present'});
    }
    
    const category: Resource = {
      name: req.body.name,
      description: req.body.description ? req.body.description : null,
    };
    
    const [result] = await mysqlDb.getConnection().query(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [category.name, category.description]
    ) as ResultSetHeader[];
    
    res.send({
      id: result.insertId,
      ...category,
    });
    
  } catch (e) {
    next(e);
  }
});

categoriesRouter.delete('/:id', async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT * FROM items WHERE category_id = ? ',
      [categoryId],
    ) as RowDataPacket[];
    
    if (results.length > 0) {
      return res.status(400).send({error: 'Cannot delete category with related items'});
    }
    
    const categories = await mysqlDb.getConnection().query('SELECT * FROM categories WHERE id = ? ', [categoryId]) as RowDataPacket[];
    const existingCategories = categories[0];
    
    if (existingCategories.length === 0) {
      return res.status(404).send({error: 'Category not found'});
    }
    
    await mysqlDb.getConnection().query('DELETE FROM categories WHERE id = ? ', [categoryId]);
    res.send({message: 'Category deleted successfully'});
  } catch (e) {
    return next(e);
  }
});

export default categoriesRouter;