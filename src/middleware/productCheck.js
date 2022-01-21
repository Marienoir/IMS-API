import { createStock } from '../services/stockServices';

const updateStockPriceAndQuantity = async (req, res, next) => {
  try {
    const { product } = req;
    if (!product) {
      const newProduct = await createStock(req.body);
      req.product = newProduct;
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

export default updateStockPriceAndQuantity;
