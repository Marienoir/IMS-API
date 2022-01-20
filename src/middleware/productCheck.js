import { getProductById } from '../services/purchaseServices';
import { createStock, getProductByName } from '../services/stockServices';

export const checkProductAndCreateStock = async (req, res, next) => {
  try {
    const { body } = req;
    const lowerProduct = body.item.toLowerCase();

    const [product] = await getProductByName(lowerProduct);
    if (product) {
      return next();
    }
    await createStock(body);

    req.item = product;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const checkApprovalStatus = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(400).json({
        status: 'fail',
        message: 'Item not available',
      });
    }
    if (product.approval_status === 'Approved' || product.approval_status === 'Disapproved') {
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
