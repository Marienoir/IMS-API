/* eslint-disable consistent-return */
import { getProductById } from '../services/purchaseServices';
import { getProductByName } from '../services/stockServices';

export const checkIfProductExistsByName = async (req, res, next) => {
  try {
    const { body: { item } } = req;
    const lowerProduct = item.toLowerCase();
    const product = await getProductByName(lowerProduct);
    req.product = product;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const checkIfProductExistsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
      return res.status(400).json({
        status: 'fail',
        message: 'Item does not exist',
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

export const checkApprovalStatus = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    if (product.approval_status !== 'pending') {
      return res.status(400).json({
        status: 'fail',
        message: `Item already ${product.approval_status}`,
      });
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
