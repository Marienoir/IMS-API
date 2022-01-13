const queries = {
  addUser: `
       INSERT INTO users (
           first_name,
           last_name,
           email,
           image_url,
           phone_number,
           gender,
           password,
           role,
           deleted,
           status,
           reset_password_token,
           reset_password_expiry,
           verification_status,
           last_login
       ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, 'false', 'active', $9, $10, 'false', $11)
       RETURNING *
      `,
  userLogin: `
      SELECT *
      FROM users
      WHERE email=$1 
      `,
};

export default queries;
