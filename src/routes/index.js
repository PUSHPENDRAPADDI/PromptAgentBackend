const express = require('express');
const fetchAgentDataController = require('../controllers/agentController/agentController');
const router = express.Router();

router.post('/fetchAllCategory', fetchAgentDataController.fetchAllCategorieForSectionController);
router.post('/updateAgentLinks', fetchAgentDataController.updateAgentLinksController);
router.post('/fetchAllPromptforCategory', fetchAgentDataController.fetchAllPromptsForCategorieController);
router.post('/fetchAllNodesEdges', fetchAgentDataController.fetchAllNodeEdgesController);
router.post('/fetchAllPromptTemplateForPrompt', fetchAgentDataController.fetchAllPromptTemplateForPromptController);
router.post('/fetchAllPromptForTable', fetchAgentDataController.fetchAllPromptController);
router.post('/deleteAllAgents', fetchAgentDataController.deleteAllAgentesController);
router.post('/fetchAllSection', fetchAgentDataController.fetchAllSectionController);
router.post('/fetchAllAgents', fetchAgentDataController.fetchAllAgentController);
router.post('/createNewUser', fetchAgentDataController.createNewUserController);
router.post('/fetchAllComponents', fetchAgentDataController.fetchAllComponentController);
router.post('/fetchAllResponse', fetchAgentDataController.fetchAllResponsesController);
router.post('/addNewAgent', fetchAgentDataController.addNewAgentController);
router.post('/fetchAgentdata', fetchAgentDataController.fetchAgentDataController);
router.post('/generateResponse', fetchAgentDataController.fetchResponseOfPrompt);
router.post('/generateResponseVertex', fetchAgentDataController.fetchResponseOfPromptVertex);



module.exports = router;


