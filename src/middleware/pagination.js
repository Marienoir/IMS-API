/* eslint-disable consistent-return */
const paginate = async (req, res, next) => {
  try {
    const { offset } = req.query;
    const { limit } = req.query;
    if (offset && limit) {
      return ({ limit, offset });
    }
  } catch (error) {
    return next(error);
  }
};

export default paginate;
