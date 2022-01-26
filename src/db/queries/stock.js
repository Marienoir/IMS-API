const stockQueries = {
  createStocks: `
        INSERT INTO stock (
            item,
            quantity,
            price,
            last_stocked
        ) VALUES (LOWER($1), 0, 0, NOW())
        RETURNING *
          `,
  getItemByName: `
            SELECT * FROM stock
            WHERE item=$1 
          `,
  getAllStocks: `
          SELECT * FROM stock
          ORDER BY id limit $1 offset $2
          `,
  updateStock: `
          UPDATE stock 
          SET 
              quantity = stock.quantity + purchase.quantity, 
              price = stock.price + purchase.price,
              last_stocked = NOW(),
              updated_at = NOW()
          FROM (
              SELECT 
                id,
                quantity, 
                price, 
                item,
                approval_status
              FROM purchase) AS purchase
          WHERE 
              stock.item = purchase.item AND purchase.id = $1
        `,
  updateStockQuantity: `
      UPDATE stock 
      SET 
          quantity = stock.quantity - sales.quantity, 
          updated_at = NOW()
      FROM (
          SELECT 
            id,
            quantity, 
            price, 
            item
          FROM sales) AS sales
      WHERE 
          stock.item = sales.item AND sales.id = $1
      `,
};

export default stockQueries;
