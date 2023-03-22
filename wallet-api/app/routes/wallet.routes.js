module.exports = app => {
  const wallets = require("../controllers/wallet.controller.js");

  var router = require("express").Router();

  // Create a new Wallet
  router.post("/", wallets.create);

  // Retrieve all Wallets
  router.get("/", wallets.findAll);

  // Retrieve all published Wallets
  router.get("/published", wallets.findAllPublished);

  // Retrieve a single Wallet with id
  router.get("/:id", wallets.findOne);

  // Update a Wallet with id
  router.put("/:id", wallets.update);

  // Delete a Wallet with id
  router.delete("/:id", wallets.delete);

  // Create a new Wallet
  router.delete("/", wallets.deleteAll);

  app.use("/api/wallets", router);
};
