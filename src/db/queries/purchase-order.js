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
  getProductByName: `
        SELECT * FROM purchase
        WHERE item=$1 
      `,
  approveProductByName: `
        UPDATE purchase
        SET approval_status='Approved', updated_at=NOW()
        WHERE item=$1
   `,
};

export default purchaseQueries;
