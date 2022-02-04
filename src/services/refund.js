/* eslint-disable max-len */
import db from '../config/db';
import refundQueries from '../db/queries/refund';

export const createRefund = async (body) => {
  const payload = [
    body.item, body.quantity, body.reason, body.received_by,
  ];
  return db.one(refundQueries.createRefund, payload);
};

export const updateStockQuantity = (id) => db.oneOrNone(refundQueries.updateStockQuantity, [id]);

export const getAllRefunds = (search = '') => {
  if (search) {
    return db.any(refundQueries.searchRefundedItemsByReason, search);
  }
  return db.any(refundQueries.getAllRefunds);
};
