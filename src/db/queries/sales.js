const salesQueries = {
  createSales: `
          INSERT INTO sales (
              item_id,
              item,
              quantity,
              price,
              sales_personnel_id,
              customer_name,
              customer_email
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *
            `,
  getAllSales: `
            SELECT * FROM sales
            ORDER BY id limit $1 offset $2
            `,
};

export default salesQueries;
