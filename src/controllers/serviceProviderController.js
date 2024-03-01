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
    const {
        council_bar_id, 
        categories, 
        edu_back, 
        skills, 
        service_type, 
        service_name,
        n_service_provided,
        experience_years
     } = req.body;
    if (
        !(
            council_bar_id || 
            categories || 
            edu_back || 
            skills || 
            service_name || 
            service_type || 
            n_service_provided || 
            experience_years
        )
    ) 
    {
        return res
            .status(400)
            .json({ message: "Required fields are missing." });
    }
    try {
        const newServiceProvider = await ServiceProvider.create(
            council_bar_id, 
            categories, 
            edu_back, 
            skills, 
            service_type, 
            service_name,
            n_service_provided,
            experience_years
        );
        console.log("newServiceProvider : " ,newServiceProvider);
        if (!newUser) {
            // If sp not found after creation, something went wrong
            return res.status(500).json({ error: 'Sercive Provider creation failed' });
        }
        res.status(201).json({
            message: "Success! New service provider created",
        });
    } catch (error) {
        res.status(400).json({ error: "Something went wrong while creating SP " + error });
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
