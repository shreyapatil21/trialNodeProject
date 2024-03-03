// serviceRequestModel.js
import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema({
  request_id: { type: Number,
     required: false 
    },
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  sp_user_id: { type: String, required: true },
  description: { type: String, required: true },
  req_status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], required: true },
  time_date: { type: Date, required: true },
  service_request: { type: String, required: true },
  is_deleted: {
    type: Boolean,
    default: true // Default value set to true
  }
});

const ServiceRequest = mongoose.model('service_request', serviceRequestSchema);

export default ServiceRequest;
