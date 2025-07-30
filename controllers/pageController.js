import Page from '../models/Page.js';

// CREATE
export const createPage = async (req, res) => {
  try {
    const { slug, backgroundOverlayContent } = req.body;
    if (!slug) {
      return res.status(400).json({ error: 'Slug is required' });
    }
    const backgroundImage = req.files?.backgroundImage?.[0]?.path || req.body.backgroundImage;
    const page = new Page({
      slug,
      backgroundImage,
      backgroundOverlayContent
    });
    const saved = await page.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create page', details: error.message });
  }
};

// READ
export const getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get page' });
  }
};

// UPDATE
export const updatePageBySlug = async (req, res) => {
  try {
    const { backgroundOverlayContent } = req.body;
    const backgroundImage = req.files?.backgroundImage?.[0]?.path || req.body.backgroundImage;
    const updateFields = {};
    if (backgroundImage) updateFields.backgroundImage = backgroundImage;
    if (backgroundOverlayContent !== undefined) updateFields.backgroundOverlayContent = backgroundOverlayContent;
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      updateFields,
      { new: true, runValidators: true }
    );
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update page', details: error.message });
  }
};

// DELETE
export const deletePageBySlug = async (req, res) => {
  try {
    const deletedPage = await Page.findOneAndDelete({ slug: req.params.slug });
    if (!deletedPage) return res.status(404).json({ error: 'Page not found' });
    res.status(200).json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Page deletion failed' });
  }
};
