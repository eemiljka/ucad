import {
  addMedia,
  findMediaById,
  listAllMedia,
  updateMedia,
  deleteMedia as deleteMediaDB,
} from "../models/media-model.mjs";

const getMedia = async (req, res) => {
  const result = await listAllMedia();
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

const getMediaById = async (req, res) => {
  const media = await findMediaById(req.params.id);
  if (media) {
    res.json(media);
  } else {
    res.sendStatus(404);
  }
};

const postMedia = async (req, res) => {
  const { filename, size, mimetype } = req.file;
  const { title, description, user_id } = req.body;
  if (filename && title && user_id) {
    const result = await addMedia({
      filename,
      size,
      mimetype,
      title,
      description,
      user_id,
    });
    if (result.media_id) {
      res.status(201);
      res.json({ message: "New media item added.", ...result });
    } else {
      res.status(500);
      res.json(result);
    }
  } else {
    res.sendStatus(400);
  }
};

const putMedia = async (req, res) => {
  try {
    const mediaId = parseInt(req.params.id);
    const updatedItem = req.body;
    const updatedMedia = await updateMedia(mediaId, updatedItem);
    if (updatedMedia) {
      res.json(updatedMedia);
    } else {
      res.status(404).json({ message: "Media item not found" });
    }
  } catch (error) {
    console.error("Error in putMedia:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const mediaId = parseInt(req.params.id);
    const deletedMedia = await deleteMediaDB(mediaId);
    if (deletedMedia) {
      res.json(deletedMedia);
    } else {
      res.status(404).json({ message: "Media item not found." });
    }
  } catch (error) {
    console.error("Error in deleteMedia:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getMedia, getMediaById, postMedia, putMedia, deleteMedia };
