import Agent from '../models/Agent.js';


// CREATE or UPDATE Agent by slug with profileImage
export const createOrUpdateAgent = async (req, res) => {
  try {
    const {
      slug,
      fullName,
      lastName,
      kwId,
      marketCenter,
      city,
      email,
      phone,
      active
    } = req.body;

    const profileImage = req.file?.path; // multer sets this when 'single' is used

    const updateData = {
      fullName,
      lastName,
      kwId,
      marketCenter,
      city,
      email,
      phone,
      active,
    };

    if (profileImage) {
      updateData.profileImage = profileImage;
    }

    const agent = await Agent.findOneAndUpdate(
      { slug },
      updateData,
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ error: 'Agent create/update failed', details: error.message });
  }
};


// GET all agents
export const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find().sort({ createdAt: -1 });
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
};

// GET agent by slug
export const getAgentBySlug = async (req, res) => {
  try {
    const agent = await Agent.findOne({ slug: req.params.slug });
    if (!agent) return res.status(404).json({ error: 'Agent not found' });
    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agent' });
  }
};

// DELETE agent by slug
export const deleteAgentBySlug = async (req, res) => {
  try {
    const deleted = await Agent.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) return res.status(404).json({ error: 'Agent not found' });
    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete agent' });
  }
};
