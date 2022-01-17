import { getProductByName } from '../services/stockServices';

const checkIfProductExists = async (req, res, next) => {
  try {
    const { item } = req.body;
    const lowerProduct = item.toLowerCase();

    const [product] = await getProductByName(lowerProduct);
    if (product) {
      return res.status(403).json({
        status: 'Failed',
        message: 'Item Already Exists',
      });
    }

    req.item = product;
    return next();
  } catch (error) {
    return next(error);
  }
};

export default checkIfProductExists;
