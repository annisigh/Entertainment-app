import express from "express";
import { verifyToken } from "../middleware/verfiyToken.middleware.js";
import {
  addBookmarkController,
  deleteBookmarkController,
  fetchUserBookmarkController,
} from "../controller/bookmark.controller.js";

const bookmarkRouter = express.Router();

// Route add to the bookmark.
bookmarkRouter.post("/bookmark/add", verifyToken, addBookmarkController);

// Route to fetch the user's bookmark data.
bookmarkRouter.get("/bookmark/data", verifyToken, fetchUserBookmarkController);

// Route to remove the bookmark.
bookmarkRouter.delete(
  "/bookmark/remove/:mediaId",
  verifyToken,
  deleteBookmarkController
);

export default bookmarkRouter;
