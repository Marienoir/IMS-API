/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import db from '../config/db';
import purchaseQueries from '../db/queries/purchase-order';

export const createPurchaseOrder = async (body) => {
  const payload = [
    body.item, body.quantity, body.price, body.approval_status, body.delivery_time,
  ];
  return db.one(purchaseQueries.createPurchaseOrder, payload);
};

export const getProductById = async (id) => db.oneOrNone(purchaseQueries.getProductById, [id]);

export const updateStatusById = async (approval_status, id) => db.oneOrNone(purchaseQueries.updateProductStatusById, [approval_status, id]);
