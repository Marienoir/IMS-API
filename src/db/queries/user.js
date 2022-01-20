const userQueries = {
  getAllUsers: `
        SELECT 
            id,
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
        FROM users
        WHERE users.deleted = 'FALSE'
        ORDER BY id limit $1 offset $2
        `,
  getUserById: `
        SELECT 
            id,
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
        FROM users
        WHERE id=$1 AND users.deleted = 'FALSE'

   `,
  deleteUserById: `
        UPDATE users
        SET 
            deleted='TRUE', 
            updated_at=NOW()
        WHERE id=$1
   `,
  updateUserById: `
        UPDATE users
        SET 
            first_name=$1,
            last_name=$2,
            email=$3,
            image_url=$4,
            phone_number=$5,
            gender=$6,
            password=$7,
            role=$8,
            deleted=$9,
            status=$10,
            updated_at=NOW()
        WHERE id=$11
        RETURNING *
  `,
  searchUserByFirstName: `
        SELECT
            id,
            first_name,
            last_name,
            email,
            image_url,
            phone_number,
            gender,
            role,
            status
        FROM users
        WHERE to_tsvector(first_name||' ' || last_name) @@to_tsquery($1) AND deleted = 'false'
  `,
  updateUserStatus: `
        UPDATE users
        SET 
            status='active',
            updated_at=NOW()
        WHERE status='inactive'
        RETURNING *
`,
};

export default userQueries;
