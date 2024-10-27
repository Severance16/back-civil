import { Router } from "express";
import { projectController } from "../controllers/projectController";
import { authenticate } from "../middlewares/auth";
import { budgetController } from "../controllers/budgetController";
import { itemController } from "../controllers/itemController";
import { subItemController } from "../controllers/subItemController";
import { informationController } from "../controllers/informationController";
import { projectExists } from "../middlewares/project";
import { budgetExist } from "../middlewares/budget";
import { itemExists } from "../middlewares/item";
import { informationExist } from "../middlewares/information";
import { assistController } from "../controllers/assistController";
import { assistExist } from "../middlewares/assist";

const router = Router()

// Middlewares
// User autenticated
router.use(authenticate)


// Validate exist data
router.param('projectId', projectExists)
router.param('budgetId', budgetExist)
router.param('itemtId', itemExists)
router.param('informationId', informationExist)
router.param('assistId', assistExist)
// ------------------------- End middlewares

// Project
router.get('/', projectController.getAllProjects)
router.get('/:id', projectController.getProject)
router.post('/', projectController.createProyect)
router.post('/add-permission', projectController.addPermission)
// ----------

// Collection 1 for Budgets
// Budget
router.get('/:projectId/budget', budgetController.getAllBudgets)
router.post('/:projectId/budget', budgetController.createBudget)
router.get('/budget/:id', budgetController.getBudget)
// ----------

// Item
router.get('/budget/:budgetId/item', itemController.getAllItemsBudget)
router.post('/budget/:budgetId/item', itemController.createItemBudget)
router.get('/budget/item/:id', itemController.getItemBudget)
// ----------

// Sub Item
router.get('/budget/item/:itemId/subitem', subItemController.getAllSubItemsBudget)
router.post('/budget/item/:itemId/subitem', subItemController.createSubItemBudget)
router.post('/budget/item/:itemId/subitems', subItemController.createSubItemsBudget)
router.get('/budget/item/subitem/:id', subItemController.getSubItemBudget)
// ----------
// ---------------------------------- End Collection 1 for Budgets

// Collection 1 for Information
// Information
router.get('/:projectId/information', informationController.getAllInformations)
router.post('/:projectId/information', informationController.createInformation)
router.get('/information/:id', informationController.getInformation)
router.put('/information/:informationId', informationController.updateInformation)
router.delete('/information/:informationId', informationController.deleteInformation)
// ----------

// Assist
router.get('/information/:informationId/assist', assistController.getAllAssists)
router.post('/information/:informationId/assist', assistController.createAssist)
router.get('/information/assist/:id', assistController.getAssist)
router.post('/information/:informationId/assists', assistController.createAssists)
router.put('/information/assist/:assistId', assistController.updateAssist)
router.delete('/information/assist/:assistId', assistController.deleteAssist)
// ----------
// ---------------------------------- End Collection 1 for Information

export default router
