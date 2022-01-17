const purchaseQueries = {
  createPurchaseOrder: `
        INSERT INTO purchase (
          item, 
          quantity, 
          price, 
          approval_status, 
          delivery_time
        ) VALUES(LOWER($1), $2, $3, $4, $5)
        RETURNING *
        `,
};

export default purchaseQueries;
