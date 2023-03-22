const db = require("../models");
const Wallet = db.wallets

// Create and Save a new Wallet
exports.create = (req, res) => {
  // Validate request
  if (!req.body.wallet) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Wallet
  const wallet = new Wallet({
    wallet: req.body.wallet,
    address: req.body.Address,
    published: req.body.published ? req.body.published : false
  });

  // Save Wallet in the database
  wallet
    .save(wallet)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Wallet."
      });
    });
};

// Retrieve all Wallets from the database.
exports.findAll = (req, res) => {
  const wallet = req.query.wallet;
  var condition = wallet ? { wallet: { $regex: new RegExp(wallet), $options: "i" } } : {};

  Wallet.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Wallets."
      });
    });
};

// Find a single Wallet with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Wallet.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Wallet with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Wallet with id=" + id });
    });
};

// Update a Wallet by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Wallet.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Wallet with id=${id}. Maybe Wallet was not found!`
        });
      } else res.send({ message: "Wallet was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Wallet with id=" + id
      });
    });
};

// Delete a Wallet with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Wallet.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Wallet with id=${id}. Maybe Wallet was not found!`
        });
      } else {
        res.send({
          message: "Wallet was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Wallet with id=" + id
      });
    });
};

// Delete all Wallets from the database.
exports.deleteAll = (req, res) => {
  Wallet.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Wallets were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Wallets."
      });
    });
};

// Find all published Wallets
exports.findAllPublished = (req, res) => {
  Wallet.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Wallets."
      });
    });
};
