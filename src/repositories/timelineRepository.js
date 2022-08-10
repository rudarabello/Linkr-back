import connection from '../database/postgres.js';

export const getPosts = async () => {
  return await connection.query(
    `
      SELECT
        p.id,
        p.link,
        p.text,
        u.username,
        u.avatar,
        m.title,
        m.image,
        m.description
      FROM posts p
      JOIN users u ON u.id = p.user_id
      JOIN metadatas m ON m.post_id = p.id
      ORDER BY p.created_at DESC
      LIMIT 20
    `
  );
};

export const postPosts = async (link, text, userId) => {
  return await connection.query(
    `
      INSERT INTO posts (link, text, user_id)
      VALUES ($1, $2, $3) RETURNING id
    `,
    [link, text, userId]
  );
};

export const postMetadatas = async (metadatas, postId) => {
  const { title, image, description } = metadatas;
  await connection.query(
    `
      INSERT INTO metadatas (title, image, description, post_id)
      VALUES ($1, $2, $3, $4)
    `,
    [title, image, description, postId]
  );
};
