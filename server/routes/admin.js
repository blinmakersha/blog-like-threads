const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const adminLayout = "../views/layouts/admin";

/**
 * GET /
 * Admin Dashboard
 */
router.get("/admin", roleMiddleware(["ADMIN"]), async (req, res) => {
  try {
    const locals = {
      title: "Admin",
    };

    const data = await Post.find();

    res.render("admin/dashboard", {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Admin - Create New Post
 */
router.get("/add-post", roleMiddleware(["ADMIN"]), async (req, res) => {
  try {
    const locals = {
      title: "Add Post",
    };

    res.render("admin/add-post", {
      locals,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST /
 * Admin - Create New Post
 */
router.post(
  "/add-post",
  roleMiddleware(["ADMIN"]),
  authMiddleware,
  async (req, res) => {
    try {
      try {
        if (!req.body || !req.body.title || !req.body.body) {
          return res.status(404).json({ message: "Недостаточно данных" });
        }
        const newPost = new Post({
          title: req.body.title,
          body: req.body.body,
          userId: req.user.id,
        });

        await Post.create(newPost);
        res.redirect("/admin");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

/**
 * GET /
 * Admin - Create New Post
 */
router.get("/edit-post/:id", roleMiddleware(["ADMIN"]), async (req, res) => {
  try {
    const locals = {
      title: "Edit Post",
    };

    const data = await Post.findOne({ _id: req.params.id });

    res.render("admin/edit-post", {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * PUT /
 * Admin - Create New Post
 */
router.put("/edit-post/:id", roleMiddleware(["ADMIN"]), async (req, res) => {
  try {
    if (!req.body || !req.body.title || !req.body.body) {
      return res.status(404).json({ message: "Недостаточно данных" });
    }

    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    });

    // res.status(200).json({
    //   success: true,
    //   message: 'Пост успешно обновлен',
    //   postId: req.params.id
    // });

    res.redirect(`/edit-post/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
});

/**
 * DELETE /
 * Admin - Delete Post
 */
router.delete(
  "/delete-post/:id",
  roleMiddleware(["ADMIN"]),
  async (req, res) => {
    try {
      await Post.deleteOne({ _id: req.params.id });
      res.redirect("/admin");
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
