/* eslint-disable consistent-return */
import { getProductById } from '../services/purchaseServices';
import { getProductByName } from '../services/stockServices';

export const checkIfProductExistsByName = async (req, res, next) => {
  try {
    const lowerProduct = req.toLowerCase();
    const product = await getProductByName(lowerProduct);
    if (product) {
      return true;
    }

    return next;
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
