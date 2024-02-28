// routes/serviceProviderRoutes.js

import express from "express";
import {
    handleGetAllServiceProviders,
    handleGetServiceProviderById,
    handleCreateServiceProvider,
    handleUpdateServiceProviderById,
    handleDeleteServiceProviderById,
} from "../controllers/serviceProviderController.js";

const serviceProviderRoutes = express.Router();

// Route to get all service providers
serviceProviderRoutes.get("/", handleGetAllServiceProviders);

// Route to get a specific service provider by ID
serviceProviderRoutes.get("/:serviceProviderId", handleGetServiceProviderById);

// Route to create a new service provider
serviceProviderRoutes.post("/", handleCreateServiceProvider);

// Route to update a service provider by ID
serviceProviderRoutes.put("/:serviceProviderId", handleUpdateServiceProviderById);

// Route to delete a service provider by ID
serviceProviderRoutes.delete("/:serviceProviderId", handleDeleteServiceProviderById);

export default serviceProviderRoutes;
