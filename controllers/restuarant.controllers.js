const db = require("../models")
const Restuarant = db.restuarant


exports.create = (req, res) => {
  if(!req.body.title){
      res.status(400).send({message: "Content of the restuarants cannot be empty"});
      return;
  }

  console.log(req.body.title)
  // Create
  const restuarants = new Restuarant({
    title: req.body.title,
    image: req.body.image,
    about: req.body.about,
    restuarantUrl: req.body.restuarantUrl  
  });

  console.log(restuarants)

  restuarants.save(restuarants).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the restuarants"
        });
  });
};
exports.findAll = (req, res) => {
    const title = req.query.title;

    var condition = title ? { title: {$regex: new RegExp(title), $options: "i"} } : {};

    Restuarant.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing restuarants"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Restuarant.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found restuarants with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving restuarants with id=" + id });
      });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Restuarant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update restuarants with id=${id}. Maybe restuarants was not created!`
        });
      } else res.send({ message: "Post was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating the restuarants with id=" + id
      });
    });
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;

  Restuarant.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete restuarants with id=${id}. Maybe restuarants was not created!`
        });
      } else {
        res.send({
          message: "restuarants was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete restuarants with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
    Restuarant.deleteMany({})
      .then(data => {
        res.send({
          message:` ${data.deletedCount} restuarants were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all restuarants."
        });
      });
};