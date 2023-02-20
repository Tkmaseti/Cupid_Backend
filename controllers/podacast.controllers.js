const db = require("../models")
const Podcast = db.podcast


exports.create = (req, res) => {
  if(!req.body.title){
      res.status(400).send({message: "Content of the podcast cannot be empty"});
      return;
  }

  console.log(req.body.title)
  // Create
  const podcast = new Podcast({
    title: req.body.title,
    image: req.body.image,
    podcastUrl: req.body.podcastUrl
  });

  console.log(podcast)

  podcast.save(podcast).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the podcast"
        });
  });
};
exports.findAll = (req, res) => {
    const title = req.query.title;

    var condition = title ? { title: {$regex: new RegExp(title), $options: "i"} } : {};

    Podcast.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing podcast"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Podcast.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found podcast with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving podcast with id=" + id });
      });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Podcast.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update podcast with id=${id}. Maybe podcast was not created!`
        });
      } else res.send({ message: "podcast was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating the podcast with id=" + id
      });
    });
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;

  Podcast.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete podcast with id=${id}. Maybe podcast was not created!`
        });
      } else {
        res.send({
          message: "podcast was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete podcast with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
    Podcast.deleteMany({})
      .then(data => {
        res.send({
          message:` ${data.deletedCount} podcast were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all podcast."
        });
      });
};