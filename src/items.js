// mock items data
const items = [
  { id: 5, name: "porkkana" },
  { id: 6, name: "omena" },
  { id: 19, name: "appelsiini" },
];

const getItems = (res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  const jsonItems = JSON.stringify(items);
  res.end(`{"message": "All items", "items": ${jsonItems}}`);
};

const getItemsById = (res, id) => {
  // TODO: if item with id exists send it, otherwise sen 404
  res.writeHead(200, { "Content-Type": "application/json" });
  // temp hardcoded response should be replaced with an item in mock data
  const item = { id: 6, name: "omena" };
  res.end(JSON.stringify(item));
};

const postItem = (req, res) => {
  items.push({ id: Math.ceil(Math.random() * 100), name: "new item" });
  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(`{"message": "New item added."}`);
};

export { getItems, getItemsById, postItem };
