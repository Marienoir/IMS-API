/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import paginate from '../middleware/pagination';
import { createRefund, getAllRefunds, updateStockQuantity } from '../services/refund';
import { getSoldItemByName } from '../services/salesServices';
import { getUserByEmail } from '../services/userServices';

export const createRefunds = async (req, res, next) => {
  try {
    const { body } = req;
    const item = await getSoldItemByName(body.item);

    if (item) {
      const user = await getUserByEmail(req.user.email);
      req.body.received_by = user.id;
      const refundedItem = await createRefund(body);
      res.status(201).json({
        code: 201,
        message: 'Item refund successfully',
        refundedItem,
      });
      req.refundedItemId = refundedItem.id;
      return next();
    }
    res.status(400).json({
      code: 400,
      message: 'Unable to refund item as it was not sold by us',
    });
  } catch (error) {
    return next(error);
  }
};

export const updateStockIfNotFaulty = async (req, res, next) => {
  try {
    const { refundedItemId } = req;
    const { reason } = req.body;

    if (reason === 'NON-FAULTY') {
      await updateStockQuantity(refundedItemId);
    }
  } catch (error) {
    return next(error);
  }
};

export const getTotalRefunds = async (req, res, next) => {
  try {
    const { reason, all } = req.query;
    const pagination = await paginate(req);
    const { limit, offset } = pagination;

    const refunds = await getAllRefunds(limit, offset, all, reason);
    if (refunds.length !== 0) {
      return res.status(200).json({
        code: 200,
        message: 'All Refunds Gotten successfully',
        refunds,
      });
    }
    return res.status(404).json({
      code: 404,
      message: 'There are currently no refunds currently',
    });
  } catch (error) {
    return next(error);
  }
};
