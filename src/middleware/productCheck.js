import { createStock } from '../services/stockServices';
import { checkIfProductExistsByName } from './checkProduct';

const updateStockPriceAndQuantity = async (req, res, next) => {
  try {
    const product = await checkIfProductExistsByName(req.body.item);
    if (!product) {
      await createStock(req.body);
    }
    req.product = product;
    return next();
  } catch (error) {
    return next(error);
  }
};

export default updateStockPriceAndQuantity;
// export const checkApprovalStatus = async (req, res, next) => {
//   try {
//     const { product } = req;
//     if (product.approval_status === 'Approved' || product.approval_status === 'Disapproved') {
//       return res.status(400).json({
//         status: 'fail',
//         message: `Item already ${product.approval_status}`,
//       });
//     }
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// };
