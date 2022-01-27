/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import paginate from '../middleware/pagination';
import createActivityLogs from '../services/activityServices';
import { createSale, getAllSales } from '../services/salesServices';
import { updateStockQuantity } from '../services/stockServices';
import { getUserByEmail } from '../services/userServices';

export const createSales = async (req, res, next) => {
  try {
    const { product } = req;
    const { id } = product;
    const user = await getUserByEmail(req.user.email);

    if (product) {
      req.body.item_id = id;
      req.body.sales_personnel_id = user.id;

      const data = await createSale(req.body);
      req.body.user_id = user.id;
      req.body.sales_id = data.id;
      req.body.activity = 'Create Sales Order';

      await createActivityLogs(req.body);
      await updateStockQuantity(data.id);
      return res.status(201).json({
        code: 201,
        message: 'Sales Order created successfully',
        data,
      });
    }
    res.status(400).json({
      code: 400,
      message: 'Item not available in stock ',
    });
  } catch (error) {
    return next(error);
  }
};

export const getTotalSales = async (req, res, next) => {
  try {
    const pagination = await paginate(req);
    const { limit, offset } = pagination;

    const stocks = await getAllSales(limit, offset);
    if (stocks.length !== 0) {
      return res.status(200).json({
        code: 200,
        message: 'All Sales Gotten successfully',
        stocks,
      });
    }
    return res.status(404).json({
      code: 404,
      message: 'There are currently no Sales',
    });
  } catch (error) {
    return next(error);
  }
};
