// controllers/serviceProviderController.js

import ServiceProvider from "../models/ServiceProviderModel.js";
import jwt from "jsonwebtoken"
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

        const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (decoded.role == "Service Provider") {
            try {
                console.log("serive provider profile");
                const sp_user_id = decoded._id;
                const feedbacks = await ServiceProvider.find({_id:sp_user_id});
                console.log(feedbacks,sp_user_id);
                return res.status(200).json(feedbacks);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Internal Server Error 1' });
            }

        }
        console.log("out: ")
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
        !body.council_bar_id ||
        !body.categories ||
        !body.edu_back ||
        !body.service_type ||
        !body.service_name ||
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
    
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const serviceProviderId = decoded._id;
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
