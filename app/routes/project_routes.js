const express = require("express");
const passport = require("passport");
const axios = require("axios");

// pull in Mongoose model for project
const Project = require("../models/project");

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require("../../lib/custom_errors");

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404;
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership;

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require("../../lib/remove_blank_fields");
const { ObjectId } = require("mongodb");
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate("bearer", { session: false });

// instantiate a router (mini app that only handles routes)
const router = express.Router();

///////////////////
// INDEX
// GET (/projects)
//////////////////
router.get("/projects", (req, res, next) => {
  Project.find()
    .populate("owner", ["email"])
    .populate("notes.owner", "email")
    .then((projects) => {
      projects = projects.filter((project) => project.private === false);
      return projects.map((project) => project);
    })
    .then((projects) => {
      res.status(200).json({ projects: projects });
    })
    .catch(next);
});

///////////////////
// SHOW MINE
// GET (/projects/mine)
//////////////////
//show all from current user
router.get("/projects/mine", requireToken, (req, res, next) => {
  Project.find({ owner: req.user.id })
    .then(handle404)
    //give back all activities
    .then((projects) => {
      //return counts of completed activities

      res.status(200).json({ projects: projects });
    })
    .catch(next);
});

///////////////////
// SHOW
// GET (/projects/:id)
//////////////////
router.get("/projects/:id", (req, res, next) => {
  Project.findById(req.params.id)
    .then(handle404)
    .then((project) => {
      res.status(200).json({ project: project });
    })
    .catch(next);
});

///////////////////
// CREATE
// POST (/projects)
//////////////////
router.post("/projects", requireToken, (req, res, next) => {
  req.body.project.owner = req.user.id;
  Project.create(req.body.project)
    .then((project) => {
      res.status(201).json({ project: project });
    })
    .catch(next);
});

///////////////////
// UPDATE
// PATCH (/projects/:id)
//////////////////
router.patch("/projects/:id", requireToken, removeBlanks, (req, res, next) => {
  delete req.body.project.owner;

  Project.findById(req.params.id)
    .then(handle404)
    .then((project) => {
      requireOwnership(req, project);

      return project.updateOne(req.body.project);
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});

///////////////////
// DESTROY
// DELETE (/projects/:id)
//////////////////
router.delete("/projects/:id", requireToken, (req, res, next) => {
  Project.findById(req.params.id)
    .then(handle404)
    .then((project) => {
      requireOwnership(req, project);
      project.deleteOne();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
