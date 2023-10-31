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
  console.log("getItemsById", id);
  const item = items.find((element) => element.id == id);
  if (item) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(item));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end('{ message: "Item not found." }');
  }
};

const postItem = (req, res) => {
  let body = [];
  req
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      console.log("req body", body);
      body = JSON.parse(body);
      // check if body is "valid"
      if (!body.name) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(`{"message": "Missing data."}`);
        return;
      }

      // check id of the last item in items and add 1
      const newId = items[items.length - 1].id + 1;
      items.push({ id: newId, name: body.name });
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(`{"message": "New item added."}`);
    });
};

const deleteItem = (res, id) => {
  const index = items.findIndex((item) => item.id == id);

  if (index !== -1) {
    items.splice(index, 1);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(`{"message": "Item with id ${id} deleted."}`);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(`{"message": "Item not found."}`);
  }
};

const putItem = (res, id, req) => {
  const item = items.find((element) => element.id == id);
  if (item) {
    let body = [];

    req
      .on("error", (err) => {
        console.error(err);
      })
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(boody).toString();
        console.log("req body", body);
        body = JSON.parse(body);

        item.name = body.name || item.name;

        res.writeHead(200, { "Content-Type": "application(json" });
        res.end(`{"message": "Item with id ${id} updated."}`);
      });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(`{"message": "Item not found."}`);
  }
};

export { getItems, getItemsById, postItem, deleteItem, putItem };
