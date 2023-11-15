import {
  addMedia,
  findMediaById,
  listAllMedia,
} from "../models/media-model.mjs";

const getMedia = (req, res) => {
  res.json(listAllMedia());
};

const getMediaById = (req, res) => {
  const media = findMediaById(req.params.id);
  if (media) {
    res.json(media);
  } else {
    res.sendStatus(404);
  }
};

const postMedia = (req, res) => {
  const { filename, title, description, user_id } = req.body;
  if (filename && title && description && user_id) {
    addMedia(req.body);
    res.status(201);
    res.json({ message: "New media item added." });
  } else {
    res.sendStatus(400);
  }
};

const putMedia = (req, res) => {
  const mediaId = parseInt(req.params.id);
  const updatedItem = req.body;

  const index = mediaItems.findIndex((item) => item.media_id === mediaId);

  if (index !== -1) {
    mediaItems[index] = { ...mediaItems[index], ...updatedItem };
    res.json(mediaItems[index]);
  } else {
    res.status(404).json({ message: "Media item not found" });
  }
};

const deleteMedia = (req, res) => {
  const mediaId = parseInt(req.params.id);

  const index = mediaItems.findIndex((item) => item.media_id === mediaId);

  if (index !== -1) {
    const deletedItem = mediaItems.splice(index, 1)[0];
    res.json(deletedItem);
  } else {
    res.status(404).json({ message: "Media item not found." });
  }
};

export { getMedia, getMediaById, postMedia, putMedia, deleteMedia };
