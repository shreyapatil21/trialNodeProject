// controllers/serviceProviderController.js

import ServiceProvider from "../models/ServiceProviderModel.js";

async function handleGetAllServiceProviders(req, res) {
    try {
        const serviceProviders = await ServiceProvider.find();
        res.status(200).json(serviceProviders);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleGetServiceProviderById(req, res) {
    const serviceProviderId = req.params.serviceProviderId;
    try {
        const serviceProvider =
            await ServiceProvider.findById(serviceProviderId);
        if (!serviceProvider)
            return res
                .status(404)
                .json({ error: "Service provider not found" });
        return res.json(serviceProvider);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleCreateServiceProvider(req, res) {
    const body = req.body;
    if (
        !body ||
        !body.rating_points ||
        !body.council_bar_id ||
        !body.categories ||
        !body.edu_back ||
        !body.service_type ||
        !body.service_name ||
        !body.n_service_provided ||
        !body.n_service_pending ||
        !body.status ||
        !body.experience_years
    ) {
        return res
            .status(400)
            .json({ message: "Required fields are missing." });
    }
    try {
        const newServiceProvider = await ServiceProvider.create(body);
        res.status(201).json({
            message: "Success! New service provider created",
            serviceProvider: newServiceProvider,
        });
    } catch (error) {
        res.status(400).json({ error: "Bad Request" + error });
    }
}

async function handleUpdateServiceProviderById(req, res) {
    const serviceProviderId = req.params.serviceProviderId;
    const body = req.body;
    try {
        const updatedServiceProvider = await ServiceProvider.findByIdAndUpdate(
            serviceProviderId,
            body,
            { new: true }
        );
        if (!updatedServiceProvider)
            return res
                .status(404)
                .json({ error: "Service provider not found" });
        return res.json(updatedServiceProvider);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleDeleteServiceProviderById(req, res) {
    const serviceProviderId = req.params.serviceProviderId;
    try {
        const deletedServiceProvider =
            await ServiceProvider.findByIdAndDelete(serviceProviderId);
        if (!deletedServiceProvider)
            return res
                .status(404)
                .json({ error: "Service provider not found" });
        return res.json({ message: "Service provider deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export {
    handleGetAllServiceProviders,
    handleGetServiceProviderById,
    handleCreateServiceProvider,
    handleUpdateServiceProviderById,
    handleDeleteServiceProviderById,
};
