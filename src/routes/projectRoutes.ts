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
import { progressExist } from "../middlewares/progress";
import { progressController } from "../controllers/progressController";
import { mishapExist } from "../middlewares/mishap";
import { misahpController } from "../controllers/mishapController";
import { inventoryController } from "../controllers/inventoryController";
import { toolController } from "../controllers/toolsController";
import { inputController } from "../controllers/inputController";
import { inventoryExist } from "../middlewares/inventory";
import { noteController } from "../controllers/noteController";
import { toolExist } from "../middlewares/tool";
import { inputExist } from "../middlewares/input";

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
router.param('progressId', progressExist)
router.param('mishapId', mishapExist)
router.param('inventoryId', inventoryExist)
router.param('toolId', toolExist)
router.param('inputId', inputExist)
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

// Collection 2 for Information
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
router.put('/information/assist/:assistId', assistController.updateAssist)
router.delete('/information/assist/:assistId', assistController.deleteAssist)
// ----------
// ---------------------------------- End Collection 2 for Information

// Progress
router.get('/:projectId/progress', progressController.getAllProgress )
router.post('/:projectId/progress', progressController.createProgress)
router.get('/progress/:id', progressController.getProgress)
router.put('/progress/:progressId', progressController.updateProgress)
router.delete('/progress/:progressId', progressController.deleteProgress)
// ----------

// Mishaps
router.get('/:projectId/mishap', misahpController.getAllMishaps)
router.post('/:projectId/mishap', misahpController.createMishap)
router.get('/mishap/:id', misahpController.getMishap)
router.put('/mishap/:mishapId', misahpController.updateMishap)
router.delete('/mishap/:mishapId', misahpController.deleteMishap)
// ----------

// Collection 3 for Inventory
// Inventory
router.get('/:projectId/inventory', inventoryController.getInventory)
router.post('/:projectId/inventory', inventoryController.createInventory)
router.get('/:projectId/inventory-s', inventoryController.getAllInventory)
router.get('/:projectId/inventory-tools', inventoryController.getInventoryTools)
router.get('/:projectId/inventory-inputs', inventoryController.getInventoryInputs)
// ----------

// Collection Tool
router.get('/inventory/:inventoryId/tool', toolController.getAllTools)
router.get('/tool/:id', toolController.getTool)
router.post('/inventory/:inventoryId/tool', toolController.createTool)
router.put('/inventory/tool/:toolId', toolController.updateTool)
// ----------

// Collection Input
router.get('/inventory/:inventoryId/input', inputController.getAllInputs)
router.get('/input/:id', inputController.getInput)
router.post('/inventory/:inventoryId/input', inputController.createInput)
router.put('/inventory/input/:inputId', inputController.updateInput)
// ----------

// Collection Note
router.post('/inventory/note', noteController.createNote)
router.get('/inventory/note/:noteId', noteController.getNote)
router.get('/tool/:toolId/note', noteController.getNotesByToolId)
router.get('/input/:inputId/note', noteController.getNotesByInputId)
router.delete('/inventory/note/:noteId', noteController.deleteNote)
// ----------
// ---------------------------------- End Collection 3 for Inventory

export default router
