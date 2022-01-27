const activityLogs = {
  activity_log: `
         INSERT INTO activity_log (
            user_id,
            sales_id,
            purchase_id,
            stock_id,
            activity
         ) VALUES($1, $2, $3, $4, $5)
         RETURNING *
        `,
};

export default activityLogs;
