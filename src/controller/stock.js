import { getAllStocks, getProductByName } from '../services/stockServices';

export const getAnItemByName = async (req, res, next) => {
  try {
    const item = await getProductByName(req.query.item);

    if (item) {
      return res.status(200).json({
        code: 200,
        message: `${req.query.item} fetched successfully`,
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

export const getTotalStocks = async (req, res, next) => {
  try {
    const stocks = await getAllStocks();
    if (stocks.length !== 0) {
      return res.status(200).json({
        code: 200,
        message: 'All Stocks Gotten successfully',
        stocks,
      });
    }
    return res.status(404).json({
      code: 404,
      message: 'There are currently no stocks',
    });
  } catch (error) {
    return next(error);
  }
};
