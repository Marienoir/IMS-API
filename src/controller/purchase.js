import createPurchaseOrder from '../services/purchaseServices';
import { createStock } from '../services/stockServices';

const createPurchase = async (req, res, next) => {
  try {
    const { body } = req;
    const data = await createPurchaseOrder(body);
    await createStock(body);

    return res.status(201).json({
      code: 201,
      message: 'Purchase Order created successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

export default createPurchase;
