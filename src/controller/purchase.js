import { createPurchaseOrder, getProductByItem, updateStatusByProduct } from '../services/purchaseServices';

export const createPurchase = async (req, res, next) => {
  try {
    const { body } = req;
    const data = await createPurchaseOrder(body);
    return res.status(201).json({
      code: 201,
      message: 'Purchase Order created successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateApprovalStatus = async (req, res, next) => {
  try {
    const product = await getProductByItem(req.params.name);
    const { item } = product[0];
    await updateStatusByProduct(item);

    return res.status(200).json({
      code: 200,
      message: `${item} has been approved successfully`,
    });
  } catch (error) {
    return next(error);
  }
};
