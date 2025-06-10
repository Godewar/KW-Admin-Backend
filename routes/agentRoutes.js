import express from 'express';
import upload from '../middlewares/upload.js';
import {
  createOrUpdateAgent,
  getAllAgents,
  getAgentBySlug,
  deleteAgentBySlug
} from '../controllers/agentController.js';

const router = express.Router();

// Create or update agent
router.post('/agent', upload.single('profileImage'), createOrUpdateAgent);

// Get all agents
router.get('/agents', getAllAgents);

// Get single agent by slug
router.get('/agent/:slug', getAgentBySlug);

// Delete agent by slug
router.delete('/agent/:slug', deleteAgentBySlug);

export default router;
