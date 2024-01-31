const checkIdLength = (req, res, next) => {
  const idLength = 24;
  const id = req.params.id;
  if (id.length != idLength) {
    res.status(400).send("the task is not exist");
  }
};

export default checkIdLength;
