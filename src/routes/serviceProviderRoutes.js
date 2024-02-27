// routes/serviceProviderRoutes.js

import express from "express";
import {
    handleGetAllServiceProviders,
    handleGetServiceProviderById,
    handleCreateServiceProvider,
    handleUpdateServiceProviderById,
    handleDeleteServiceProviderById,
} from "../controllers/serviceProviderController.js";

const router = express.Router();

// Route to get all service providers
router.get("/", handleGetAllServiceProviders);

// Route to get a specific service provider by ID
router.get("/:serviceProviderId", handleGetServiceProviderById);

// Route to create a new service provider
router.post("/", handleCreateServiceProvider);

// Route to update a service provider by ID
router.put("/:serviceProviderId", handleUpdateServiceProviderById);

// Route to delete a service provider by ID
router.delete("/:serviceProviderId", handleDeleteServiceProviderById);

export default router;
