import checkIfProductExists from '../middleware/productCheck';
import { createStock, getProductByName } from '../services/stockServices';

// The createNewStock function below is to be improved on
export const createNewStock = async (req, res, next) => {
  try {
    const { body } = req;
    await checkIfProductExists(body.item);
    const data = await createStock(body);

    return res.status(201).json({
      code: 201,
      message: 'Stock created successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAnItemByName = async (req, res, next) => {
  try {
    const item = await getProductByName(req.query.item);

    if (item.length !== 0) {
      return res.status(200).json({
        code: 200,
        message: `${req.query.item} Gotten successfully`,
        data: item,
      });
    }
    return res.status(404).json({
      code: 404,
      message: 'Item Does Not Exist',
    });
  } catch (error) {
    return next(error);
  }
};
