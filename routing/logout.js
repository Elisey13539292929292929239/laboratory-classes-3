const express = require("express");
const router = express.Router();

const { LOGOUT_LINKS } = require("../constants/navigation");

router.get("/logout", (_req, res) => {
  res.render("logout", {
    headTitle: "Shop - Logout",
    menuLinks: LOGOUT_LINKS,
    activeLinkPath: "/logout"
  });
});

module.exports = router;


