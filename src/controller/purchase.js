/* eslint-disable camelcase */
import {
  createPurchaseOrder, getProductById, updateStatusById,
} from '../services/purchaseServices';
import { updateStock } from '../services/stockServices';

export const createPurchase = async (req, res, next) => {
  try {
    const { body } = req;
    const data = await createPurchaseOrder(body);

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

    return res.status(200).json({
      code: 200,
      message: `${item.toUpperCase()} with id ${id} has been ${status} successfully`,
      data: updatedProduct,
    });
  } catch (error) {
    return next(error);
  }
};
