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
};

export default stockQueries;
