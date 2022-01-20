const purchaseQueries = {
  createPurchaseOrder: `
        INSERT INTO purchase (
          item, 
          quantity, 
          price, 
          approval_status, 
          delivery_time
        ) VALUES(LOWER($1), $2, $3, 'pending', $5)
        RETURNING *
        `,
  getProductById: `
        SELECT * FROM purchase
        WHERE id=$1 
      `,
  updateProductStatusById: `
        UPDATE purchase
        SET 
          approval_status=$1, 
          updated_at=NOW()
        WHERE id=$2
        RETURNING *
        `,
};

export default purchaseQueries;
