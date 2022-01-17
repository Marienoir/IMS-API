const authQueries = {
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
       ) VALUES($1, $2, LOWER($3), $4, $5, $6, $7, $8, 'false', 'active', $9, $10, 'false', NOW())
       RETURNING id,
       first_name,
       last_name,
       email,
       image_url,
       phone_number,
       gender,
       role,
       deleted,
       status,
       verification_status,
       last_login
      `,
  getUserByEmail: `
      SELECT 
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
      verification_status,
      last_login
      FROM users
      WHERE email=$1 
      `,
};

export default authQueries;
