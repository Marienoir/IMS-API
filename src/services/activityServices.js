import db from '../config/db';
import activityLogs from '../db/queries/activity';

const createActivityLogs = async (body) => {
  const payload = [body.user_id, body.sales_id, body.purchase_id, body.stock_id, body.activity];
  return db.one(activityLogs.activity_log, payload);
};

export default createActivityLogs;
