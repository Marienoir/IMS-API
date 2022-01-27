/* eslint-disable camelcase */
import createActivityLogs from '../services/activityServices';
import {
  createPurchaseOrder, getProductById, updateStatusById,
} from '../services/purchaseServices';
import { getProductByName, updateStock } from '../services/stockServices';
import { getUserByEmail } from '../services/userServices';

export const createPurchase = async (req, res, next) => {
  try {
    const { body } = req;
    const data = await createPurchaseOrder(body);

    const user = await getUserByEmail(req.user.email);
    req.body.user_id = user.id;
    req.body.purchase_id = data.id;
    req.body.activity = 'Create Purchase Order';
    await createActivityLogs(body);

    return res.status(201).json({
      code: 201,
      message: 'Purchase Order created successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateApprovalStatus = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    const { id, item } = product;
    const { status } = req.params;
    const updatedProduct = await updateStatusById(status, id);

    if (updatedProduct.approval_status === 'approved') {
      await updateStock(id);
    }
    const user = await getUserByEmail(req.user.email);
    const stock = await getProductByName(item);
    req.body.user_id = user.id;
    req.body.purchase_id = id;
    req.body.stock_id = stock.id;
    req.body.activity = ` ${status.toUpperCase()} ${item}`;
    await createActivityLogs(req.body);

    return res.status(200).json({
      code: 200,
      message: `${item.toUpperCase()} with id ${id} has been ${status} successfully`,
      data: updatedProduct,
    });
  } catch (error) {
    return next(error);
  }
};
