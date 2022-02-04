/* eslint-disable max-len */
import db from '../config/db';
import salesQueries from '../db/queries/sales';

export const createSale = async (body) => {
  const payload = [
    body.item_id, body.item, body.quantity, body.price, body.sales_personnel_id, body.customer_name, body.customer_email,
  ];
  return db.one(salesQueries.createSales, payload);
};

export const getSoldItemByName = (item) => db.oneOrNone(salesQueries.getSoldItemByName, [item]);

export const getAllSales = () => db.any(salesQueries.getAllSales);
