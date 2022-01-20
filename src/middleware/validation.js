/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */
const validateInput = (data, type) => async (req, res, next) => {
  try {
    const getType = {
      body: req.body,
      params: req.params,
      queries: req.queries,
      headers: req.headers,
    };
    const options = {
      language: {
        key: '{{key}}',
      },
    };
    const result = getType[type];
    const isValid = await data.schema.validate(result, options);
    if (!isValid.error) {
      return next();
    }
    const {
      message,
    } = isValid.error.details[0];

    return res.status(400).json({
      status: 'fail',
      message: message.replace(/[\"]/gi, ''),
      errors: data.message,
    });
  } catch (error) {
    next(error);
  }
};

export default validateInput;
