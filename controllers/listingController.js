import Listing from '../models/Listing.js';

// Create Listing
export const createListing = async (req, res) => {
  try {
    const {
      slug, title, marketCenter, city, address, locationCode,
      price, propertyType, propertySubType, bedrooms, bathrooms, areaSize,
      agentName
    } = req.body;

    const images = req.files?.map(file => file.filename) || [];

    const listing = new Listing({
      slug,
      title,
      marketCenter,
      city,
      address,
      locationCode,
      price,
      propertyType,
      propertySubType,
      bedrooms,
      bathrooms,
      areaSize,
      agent: {
        name: agentName,
        photo: req.body.agentPhoto || ''
      },
      images
    });

    const saved = await listing.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create listing', details: error.message });
  }
};

// Get All Listings
export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
};

// Get Listing by Slug
export const getListingBySlug = async (req, res) => {
  try {
    const listing = await Listing.findOne({ slug: req.params.slug });
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listing' });
  }
};

// Update Listing
export const updateListing = async (req, res) => {
  try {
    const update = {
      ...req.body,
    };

    if (req.files?.length) {
      update.images = req.files.map(file => file.filename);
    }

    const listing = await Listing.findOneAndUpdate(
      { slug: req.params.slug },
      update,
      { new: true }
    );

    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update listing' });
  }
};

// Delete Listing
export const deleteListing = async (req, res) => {
  try {
    const deleted = await Listing.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) return res.status(404).json({ error: 'Listing not found' });
    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete listing' });
  }
};
