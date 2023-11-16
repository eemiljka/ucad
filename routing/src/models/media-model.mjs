import db from "../utils/database.mjs";

// mock data
const mediaItems = [
  {
    media_id: 9592,
    filename: "f504.jpg",
    filesize: 48975,
    title: "Desert",
    description: "",
    user_id: 3609,
    media_type: "image/jpeg",
    created_at: "2023-10-12T06:59:05.000Z",
  },
  {
    media_id: 9590,
    filename: "60ac.jpg",
    filesize: 23829,
    title: "Basement",
    description: "Light setup in basement",
    user_id: 305,
    media_type: "image/jpeg",
    created_at: "2023-10-12T06:56:41.000Z",
  },
];

const listAllMedia = async () => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM mediaItems");
    console.log("rows", rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const findMediaById = async (id) => {
  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM mediaItems WHERE media_id = ?", [id]);

    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (e) {
    console.error("Error in findMediaById:", e.message);
    throw e;
  }
};

const addMedia = async (media) => {
  const { filename, title, description, user_id } = media;

  try {
    const [result] = await db
      .promise()
      .query(
        "INSERT INTO mediaItems (filename, title, description, user_id) VALUES (?, ?, ?, ?)",
        [filename, title, description, user_id]
      );

    const newMediaId = result.insertId;
    return { media_id: newMediaId };
  } catch (e) {
    console.error("Error in addMedia:", e.message);
    throw e;
  }
};

export { listAllMedia, findMediaById, addMedia };
