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

export const getProductByName = (item, approval_status) => db.any(stockQueries.getItemByName, [item, approval_status]);

export const getAllStocks = () => db.any(stockQueries.getAllStocks);
