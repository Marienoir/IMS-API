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
  getSoldItemByName: `
          SELECT * FROM sales
          WHERE item=$1 
  `,
  getAllSales: `
          SELECT * FROM sales
          `,
};

export default salesQueries;
