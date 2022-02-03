import db from '../config/db';
import stockQueries from '../db/queries/stock';

export const createStock = async (body) => {
  const payload = [
    body.item, body.quantity, body.price, body.last_stocked,
  ];
  return db.one(stockQueries.createStocks, payload);
};

export const getProductByName = (item) => db.oneOrNone(stockQueries.getItemByName, [item]);

export const getAllStocks = () => db.any(stockQueries.getAllStocks);

export const updateStock = (id) => db.oneOrNone(stockQueries.updateStock, [id]);

export const updateStockQuantity = (id) => db.oneOrNone(stockQueries.updateStockQuantity, [id]);
