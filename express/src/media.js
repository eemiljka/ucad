// mock data for assignment, could be placed to separate json-file too.
const mediaItems = [
  {
    media_id: 9632,
    filename: "ffd8.jpg",
    filesize: 887574,
    title: "Favorite drink",
    description: "",
    user_id: 1606,
    media_type: "image/jpeg",
    created_at: "2023-10-16T19:00:09.000Z",
  },
  {
    media_id: 9626,
    filename: "dbbd.jpg",
    filesize: 60703,
    title: "Miika",
    description: "My Photo",
    user_id: 3671,
    media_type: "image/jpeg",
    created_at: "2023-10-13T12:14:26.000Z",
  },
  {
    media_id: 9625,
    filename: "2f9b.jpg",
    filesize: 30635,
    title: "Aksux",
    description: "friends",
    user_id: 260,
    media_type: "image/jpeg",
    created_at: "2023-10-12T20:03:08.000Z",
  },
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

const getMedia = (req, res) => {
  res.json(mediaItems);
};

const getItemsById = (req, res) => {
  console.log("Request for media_id:", req.params.id);
  const mediaId = parseInt(req.params.id);
  const mediaItem = mediaItems.find((item) => item.media_id === mediaId);

  if (mediaItem) {
    res.json(mediaItem);
  } else {
    console.log("Media item not found");
    res.status(404).json({ message: "Media item not found" });
  }
};

let lastMediaId = 9632;

const generateNewMediaId = () => {
  lastMediaId++;
  return lastMediaId;
};

const createMediaItem = (req, res) => {
  const newItem = req.body;

  newItem.media_id = generateNewMediaId();
  mediaItems.push(newItem);

  res.status(201).json(newItem);
};

export { getMedia, getItemsById, createMediaItem };
