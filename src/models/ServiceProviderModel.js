// models/ServiceProvider.js

import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema({
    sp_user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    rating_points: {
        type: Number,
        // required: true,
    },
    council_bar_id: {
        type: String,
        required: true,
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
        enum: ["Type1", "Type2", "Type3"],
        required: true,
    },
    service_name: {
        type: String,
        required: true,
    },
    bio_content: String,
    n_service_provided: {
        type: Number,
        // required: true,
    },
    n_service_pending: {
        type: Number,
        // required: true,
    },
    organization: String,
    status: {
        type: Boolean,
        // required: true,
    },
    experience_years: {
        type: Number,
        required: true,
    },
});

const ServiceProvider = mongoose.model(
    "ServiceProvider",
    serviceProviderSchema
);

export default ServiceProvider;
