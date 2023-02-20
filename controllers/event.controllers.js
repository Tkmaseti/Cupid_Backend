const db = require("../models")
const Event = db.event


exports.create = (req, res) => {
  if(!req.body.title){
      res.status(400).send({message: "Content of the event cannot be empty"});
      return;
  }

  console.log(req.body.title)
  // Create
  const event = new Event({
    title: req.body.title,
    image: req.body.image,
    about: req.body.about,
    eventUrl: req.body.eventUrl  
  });

  console.log(event)

  event.save(event).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the event"
        });
  });
};
exports.findAll = (req, res) => {
    const title = req.query.title;

    var condition = title ? { title: {$regex: new RegExp(title), $options: "i"} } : {};

    Event.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing event"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Event.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found event with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving event with id=" + id });
      });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Event.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update event with id=${id}. Maybe event was not created!`
        });
      } else res.send({ message: "Post was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating the event with id=" + id
      });
    });
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;

  Event.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete event with id=${id}. Maybe event was not created!`
        });
      } else {
        res.send({
          message: "event was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete event with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
    Event.deleteMany({})
      .then(data => {
        res.send({
          message:` ${data.deletedCount} event were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all event."
        });
      });
};