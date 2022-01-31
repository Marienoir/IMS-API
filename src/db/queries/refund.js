const refundQueries = {
  createRefund: `
            INSERT INTO refunds (
                item,
                quantity,
                reason,
                received_by
            ) VALUES ($1, $2, $3, $4)
            RETURNING *
              `,
  getAllRefunds: `
              SELECT * FROM refunds
              `,
  getPaginatedRefunds: `
              SELECT * FROM refunds
              ORDER BY id limit $1 offset $2
              `,
  getRefundsById: `
              SELECT * FROM refunds
              WHERE id=$1
              `,
  updateStockQuantity: `
              UPDATE stock 
              SET 
                  quantity = stock.quantity + refunds.quantity, 
                  updated_at = NOW()
              FROM (
                  SELECT 
                    id,
                    quantity, 
                    item
                  FROM refunds) AS refunds
              WHERE 
                  stock.item = refunds.item AND refunds.id = $1
              `,
  searchRefundedItemsByReason: `
              SELECT *
              FROM refunds
              WHERE reason=$1
        `,
};

export default refundQueries;
