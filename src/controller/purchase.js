import {
  createPurchaseOrder, disapproveStatusById, getProductById, updateStatusById,
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
    await updateStatusById(id);
    await updateStock(id);

    return res.status(200).json({
      code: 200,
      message: `${item.toUpperCase()} with id ${id} has been approved successfully`,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateDisapprovalStatus = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    const { id, item } = product;
    await disapproveStatusById(id);

    return res.status(200).json({
      code: 200,
      message: `${item.toUpperCase()} with id ${id} has been disapproved`,
    });
  } catch (error) {
    return next(error);
  }
};
