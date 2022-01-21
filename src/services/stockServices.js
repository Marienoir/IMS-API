/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import db from '../config/db';
import stockQueries from '../db/queries/stock';

export const createStock = async (body) => {
  const payload = [
    body.item, body.quantity, body.price, body.last_stocked,
  ];
  return db.one(stockQueries.createStocks, payload);
};

export const getProductByName = (item) => db.oneOrNone(stockQueries.getItemByName, [item]);

export const getAllStocks = (limit, offset) => db.any(stockQueries.getAllStocks, [limit, offset]);

export const updateStock = (id) => db.oneOrNone(stockQueries.updateStock, [id]);
