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
};

export default stockQueries;
