const express = require("express");
const router = express.Router();

const { LOGOUT_LINKS } = require("../constants/navigation");

router.get("/kill", (_req, res) => {
  res.render("kill", {
    headTitle: "Shop - Force logout",
    menuLinks: LOGOUT_LINKS,
    activeLinkPath: "/kill"
  });
});

module.exports = router;
