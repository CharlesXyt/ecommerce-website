const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("/products/batch/:ids", (req, res) => {
  const ids = req.params.ids.split(",").map(Number);
  const data = router.db
    .get("products")
    .value()
    .filter((product) => ids.includes(product.id));
  res.json(data);
});

server.get("/products", (req, res) => {
  let { _page, _limit, search, category } = req.query;
  _page = parseInt(_page) || 1;
  _limit = parseInt(_limit) || 8;

  let products = router.db.get("products").value();

  if (category) {
    const categoryList = category.split(",");
    products = products.filter((product) =>
      categoryList.includes(product.category)
    );
  }

  if (search) {
    const searchTerm = search.toLowerCase();
    products = products.filter(
      (product) =>
        product.heading.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
  }

  const startIndex = (_page - 1) * _limit;
  const endIndex = startIndex + _limit;
  const paginatedProducts = products.slice(startIndex, endIndex);

  res.json({
    data: paginatedProducts,
    total: products.length,
    page: _page,
    limit: _limit,
  });
});

server.get("/products/categories", (req, res) => {
  let categories = router.db.get("categories").value();
  res.json(categories);
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  next();
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
