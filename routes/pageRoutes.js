import express from 'express';
import {
  createPage,
  getPageBySlug,
  updatePageBySlug,
  deletePageBySlug
} from '../controllers/pageController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// CREATE
router.post(
  '/page',
  upload.fields([
    { name: 'backgroundImage', maxCount: 1 }
  ]),
  createPage
);

// READ
router.get('/page/:slug', getPageBySlug);

// UPDATE
router.put(
  '/page/:slug',
  upload.fields([
    { name: 'backgroundImage', maxCount: 1 }
  ]),
  updatePageBySlug
);

// DELETE
router.delete('/page/:slug', deletePageBySlug);

export default router;