const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config");
const logger = require("./utils/logger");
const getFileFromAbsolutePath = require("./utils/getFileFromAbsolutePath");

const productRoutes = require("./routing/products");
const logoutRoutes = require("./routing/logout");
const killRoutes = require("./routing/kill");
const homeRoutes = require("./routing/home");

const { STATUS_CODE } = require("./constants/statusCode");
const { MENU_LINKS } = require("./constants/navigation");

const app = express();

// 🔧 View engine setup
app.set("view engine", "ejs");
app.set("views", getFileFromAbsolutePath("views"));

// 🔧 Static files
app.use(express.static(getFileFromAbsolutePath("public")));

// 🔧 Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// 🔧 Logger middleware
app.use((request, _response, next) => {
  const { url, method } = request;
  logger.getInfoLog(url, method);
  next();
});

// 🔧 Routes
app.use("/products", productRoutes);
app.use(logoutRoutes);
app.use("/kill", killRoutes);
app.use(homeRoutes);

// 🔧 404 handler
app.use((request, response) => {
  const { url } = request;

  response.status(STATUS_CODE.NOT_FOUND).render("404", {
    headTitle: "404 - Page Not Found",
    menuLinks: MENU_LINKS,
    activeLinkPath: url
  });

  logger.getErrorLog(url);
});

// 🔧 Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
