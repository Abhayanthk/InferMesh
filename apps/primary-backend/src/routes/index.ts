import { Router } from "express";
import { 
  userController, 
  apiKeyController, 
  byoKeyController
} from "../controllers/index.ts";

export const router = Router();

// User Core
router.get("/users", userController.getAll);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);

// Entity Creation Endpoints
router.post("/apikeys", apiKeyController.create);
router.post("/byokeys", byoKeyController.create);
