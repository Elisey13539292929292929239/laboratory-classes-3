const express = require("express");
const router = express.Router();

const productsSlice = require("../store/products");
const { MENU_LINKS } = require("../constants/navigation");

router.get("/add", (_req, res) => {
  res.render("add-product", {
    headTitle: "Add product",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/add",
  });
});

router.post("/add", (req, res) => {
  const { name, description } = req.body;

  const newProduct = `Name: ${name}, Description: ${description}`;

  productsSlice.newestProduct = newProduct;
  productsSlice.products.push(newProduct);

  res.redirect("/products/new");
});

router.get("/new", (_req, res) => {
  res.render("new-product", {
    headTitle: "Newest Product",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/new",
    data: productsSlice.newestProduct,
  });
});

router.get("/", (_req, res) => {
  res.render("products", {
    headTitle: "Shop – Products",
    path: "/",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products",
    products: productsSlice.products,
  });
});

module.exports = router;
