const db = require("../models")
const Gift = db.gift


exports.create = (req, res) => {
  if(!req.body.title){
      res.status(400).send({message: "Content of the gift cannot be empty"});
      return;
  }

  console.log(req.body.title)
  // Create
  const gift = new Gift({
    title: req.body.title,
    image: req.body.image,
    about: req.body.about,
    giftUrl: req.body.eventUrl  
  });

  console.log(gift)

  gift.save(gift).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the gift"
        });
  });
};
exports.findAll = (req, res) => {
    const title = req.query.title;

    var condition = title ? { title: {$regex: new RegExp(title), $options: "i"} } : {};

    Gift.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing gift"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Gift.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found gift with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving gift with id=" + id });
      });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Gift.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update gift with id=${id}. Maybe gift was not created!`
        });
      } else res.send({ message: "Post was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating the gift with id=" + id
      });
    });
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;

  Gift.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete gift with id=${id}. Maybe gift was not created!`
        });
      } else {
        res.send({
          message: "gift was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete gift with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Gift.deleteMany({})
      .then(data => {
        res.send({
          message:` ${data.deletedCount} gift were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all gift."
        });
      });
};