const checkMediaOwnership = async (req, res, next) => {
  const mediaItemId = req.params.id;
  const userIdFromToken = req.user.user_id;

  const isOwner = await checkMediaOwnershipInDatabase(
    mediaItemId,
    userIdFromToken
  );

  if (isOwner) {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Unauthorized: You do not own this media item." });
  }
};

const checkUserOwnership = async (req, res, next) => {
  const userIdFromToken = req.user.user_id;
  const userIdFromRequest = req.params.id;

  if (userIdFromToken === userIdFromRequest) {
    next();
  } else {
    res
      .status(403)
      .json({
        message:
          "Unauthorized: You do not have permission to modify this user's data.",
      });
  }
};

export { checkMediaOwnership, checkUserOwnership };
