const purchaseQueries = {
  createPurchaseOrder: `
        INSERT INTO purchase (
          item, 
          quantity, 
          price, 
          approval_status, 
          delivery_time
        ) VALUES(LOWER($1), $2, $3, 'Pending', $5)
        RETURNING *
        `,
  getProductById: `
        SELECT * FROM purchase
        WHERE id=$1 
      `,
  approveProductById: `
        UPDATE purchase
        SET 
          approval_status='Approved', 
          updated_at=NOW()
        WHERE id=$1
      `,
  disapproveProductById: `
        UPDATE purchase
        SET 
          approval_status='Disapproved', 
          updated_at=NOW()
        WHERE id=$1
      `,
};

export default purchaseQueries;
