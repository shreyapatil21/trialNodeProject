// serviceRequestController.js
import ServiceRequest from "../models/serviceRequestModel.js";
import jwt from "jsonwebtoken";

async function handleGetAllServiceRequests(req, res) {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (decoded.role == "Service Provider") {
        try {
            const sp_user_id = decoded._id;
            const serviceRequests = await ServiceRequest.find({ sp_user_id });
            return res.status(200).json(serviceRequests);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else if (decoded.role == "Client") {
        try {
            let query = {};
            if (decoded.role === "Client") {
                query = { user_id: decoded._id };
            }
            const serviceRequests = await ServiceRequest.find(query);
            return res.status(200).json(serviceRequests);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        return res.status(401).json({ error: "Unauthorized Access" });
    }
}

async function handleGetServiceRequestById(req, res) {
    const requestId = req.params.requestId;
    try {
        const serviceRequest = await ServiceRequest.findById(requestId);
        if (!serviceRequest)
            return res.status(404).json({ error: "Service request not found" });
        return res.json(serviceRequest);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleCreateServiceRequest(req, res) {
    const body = req.body;
    if (
        !body ||
        !body.sp_user_id ||
        !body.description ||
        !body.req_status ||
        !body.time_date ||
        !body.service_request
    ) {
        return res.status(400).json({ message: "All fields are required." });
    }
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    try {
        const newServiceRequest = await ServiceRequest.create({
            user_id: decoded._id,
            sp_user_id: body.sp_user_id,
            description: body.description,
            req_status: body.req_status,
            time_date: new Date(body.time_date),
            service_request: body.service_request,
        });
        await newServiceRequest.save(); // added this line on 27/2/24 (12:05 PM)
        res.status(201).json({
            message: "Success! New service request created",
        });
    } catch (error) {
        res.status(400).json({ error: "Bad Request" + error });
    }
}

async function handleUpdateServiceRequestById(req, res) {
    const requestId = req.params.requestId;
    const body = req.body;
    try {
        const updateServiceRequest = await ServiceRequest.findByIdAndUpdate(
            requestId,
            {
                user_id: body.user_id,
                sp_user_id: body.sp_user_id,
                description: body.description,
                req_status: body.req_status,
                time_date: new Date(body.time_date),
                service_request: body.service_request,
            }
        );
        if (!updateServiceRequest)
            return res.status(404).json({ error: "Service request not found" });
        return res.json(updateServiceRequest);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleDeleteServiceRequestById(req, res) {
    const requestId = req.params.requestId;
    const newStatus = req.params.newstatus;
    try {
        // Find the service request by requestId and update the is_deleted field
        const updatedRequest = await ServiceRequest.findOneAndUpdate(
            { _id: requestId }, // Query for the service request by its _id
            { $set: { is_deleted: newStatus } }, // Set the new value for is_deleted
            { new: true } // Return the updated document
        );

        if (updatedRequest) {
            console.log(
                "Service request is_deleted status updated:",
                updatedRequest
            );
            return res.status(200).json({ msg: updatedRequest });
        } else {
            console.log("Service request not found");
            return res.status(404).json({ error: "Service request not found" });
        }
    } catch (error) {
        console.error(
            "Error updating service request is_deleted status:",
            error
        );
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export {
    handleGetAllServiceRequests,
    handleGetServiceRequestById,
    handleCreateServiceRequest,
    handleUpdateServiceRequestById,
    handleDeleteServiceRequestById,
};
