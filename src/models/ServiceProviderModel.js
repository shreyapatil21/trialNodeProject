// models/ServiceProvider.js

import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema({
    sp_user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    rating_points: {
        type: Number,
        required: true,
        default: 0
    },
    council_bar_id: {
        type: String,
        //required: true,
    },
    categories: {
        type: [{ type: String }],
    },
    skills: [String],
    edu_back: [
        {
            type: String,
            required: true,
        },
    ],
    service_type: {
        type: String,
        //enum: ["Type1", "Type2", "Type3"],
        //required: true,
    },
    service_name: {
        type: String,
        //required: true,
    },
    bio_content: String,
    n_service_provided: {
        type: Number,
        required: true,
        default: 0,
    },
    n_service_pending: {
        type: Number,
        required: true,
        default: 0,
    },
    organization: String,
    status: {
        type: String,
        enum: ['Active','Inactive'],
        required: true,
        default: 'Active',
    },
    experience_years: {
        type: Number,
        required: true,
        default: 0,
    },
});

const ServiceProvider = mongoose.model(
    "ServiceProvider",
    serviceProviderSchema
);

export default ServiceProvider;
