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

const router = Router()

router.use(authenticate)

router.param('projectId', projectExists)
router.param('budgetId', budgetExist)
router.param('itemtId', itemExists)
router.param('informationId', informationExist)

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
router.get('/budget/:budgetId', budgetController.getBudget)
// ----------

// Item
router.get('/budget/:budgetId/item', itemController.getAllItemsBudget)
router.post('/budget/:budgetId/item', itemController.createItemBudget)
router.get('/budget/item/:itemId', itemController.getItemBudget)
// ----------

// Sub Item
router.get('/budget/item/:itemId/subitem', subItemController.getAllSubItemsBudget)
router.post('/budget/item/:itemId/subitem', subItemController.createSubItemBudget)
router.post('/budget/item/subitems', subItemController.createSubItemsBudget)
router.get('/budget/item/subitem/:subItemId', subItemController.getSubItemBudget)
// ----------
// ---------------------------------- End Collection 1 for Budgets

// Collection 1 for Information
// Information
router.get('/:projectId/information', informationController.getAllInformations)
router.post('/:projectId/information', informationController.createInformation)
router.get('/information/:informationId', informationController.getInformation)
router.put('/information/:informationId', informationController.updateInformation)
router.delete('/information/:informationId', informationController.deleteInformation)
// ----------

export default router
