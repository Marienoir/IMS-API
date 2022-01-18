import { getProductByItem } from '../services/purchaseServices';
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
    const product = await getProductByItem(req.params.name);

    if (product[0].approval_status === 'Approved') {
      return res.status(400).json({
        status: 'fail',
        message: 'Item already approved',
      });
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
