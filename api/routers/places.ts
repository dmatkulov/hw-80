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

export default placesRouter;