const checkIfUserIsAdmin = async (req, res, next) => {
  try {
    if (req.token.role !== 'ADM') {
      return res.status(403).json({
        status: 'Forbidden',
        message: 'Access Denied',
      });
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

export default checkIfUserIsAdmin;
