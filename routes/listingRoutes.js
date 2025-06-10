import express from 'express';
import {
  createListing,
  getAllListings,
  getListingBySlug,
  updateListing,
  deleteListing
} from '../controllers/listingController.js';
import upload  from '../middlewares/upload.js';

const router = express.Router();

// Upload multiple images (e.g., images[])
router.post('/', upload.array('images', 5), createListing);
router.get('/', getAllListings);
router.get('/:slug', getListingBySlug);
router.put('/:slug', upload.array('images', 5), updateListing);
router.delete('/:slug', deleteListing);

export default router;
