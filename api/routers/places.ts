import {Router} from 'express';
import mysqlDb from '../mysqlDb';
import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {Resource} from '../types';

const placesRouter = Router();

placesRouter.get('/', async (req, res, next) => {
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT id, name FROM places'
    );
    res.send(results);
  } catch (e) {
    return next(e);
  }
});

placesRouter.get('/:id', async (req, res, next) => {
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT id, name, description FROM places WHERE places.id = ? ',
      [req.params.id]
    ) as RowDataPacket[];
    
    const place = results[0];
    
    if (!place) {
      return res.status(404).send({error: 'Place not found!'});
    }
    
    res.send(place);
  } catch (e) {
    next(e);
  }
});

placesRouter.post('/', async (req, res, next) => {
  try {
    const name = req.body.name;
    
    if (!name) {
      return res.status(422).send({error: 'Place name must be present'});
    }
    
    const place: Resource = {
      name: req.body.name,
      description: req.body.description ? req.body.description : null,
    };
    
    const [result] = await mysqlDb.getConnection().query(
      'INSERT INTO places (name, description) VALUES (?, ?)',
      [place.name, place.description]
    ) as ResultSetHeader[];
    
    res.send({
      id: result.insertId,
      ...place,
    });
    
  } catch (e) {
    next(e);
  }
});

placesRouter.delete('/:id', async (req, res, next) => {
  const placeId = req.params.id;
  
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT * FROM items WHERE place_id = ? ',
      [placeId]
    ) as RowDataPacket[];
    
    if (results.length > 0) {
      return res.status(400).send({error: 'Cannot delete place with related items'});
    }
    
    const places = await mysqlDb.getConnection().query('SELECT * FROM places WHERE id = ? ', [placeId]) as RowDataPacket[];
    const existingPlace = places[0];
    
    if (existingPlace.length === 0) {
      return res.status(404).send({error: 'Place not found'});
    }

    await mysqlDb.getConnection().query('DELETE FROM places WHERE id = ? ', [placeId]);
    res.send({message: 'Place deleted successfully'});
  } catch (e) {
    return next(e);
  }
});

export default placesRouter;