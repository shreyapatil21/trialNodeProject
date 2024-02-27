// serviceRequestModel.js
import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema({
  request_id: { type: Number, required: false },
  user_id: { type: String, required: true },
  sp_user_id: { type: String, required: true },
  description: { type: String, required: true },
  req_status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], required: true },
  time_date: { type: Date, required: true },
  service_request: { type: String, required: true },
});

const ServiceRequest = mongoose.model('service_request', serviceRequestSchema);

export default ServiceRequest;
