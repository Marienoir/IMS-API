/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import db from '../config/db';
import purchaseQueries from '../db/queries/purchase-order';

const createPurchaseOrder = async (body) => {
  const payload = [
    body.item, body.quantity, body.price, body.approval_status, body.delivery_time,
  ];
  return db.one(purchaseQueries.createPurchaseOrder, payload);
};

export default createPurchaseOrder;
