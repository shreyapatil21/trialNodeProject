// serviceRequestController.js
import ServiceRequest from '../models/serviceRequestModel.js';

async function handleGetAllServiceRequests(req, res) {
  try {
    const serviceRequests = await ServiceRequest.find();
    res.status(200).json(serviceRequests);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleGetServiceRequestById(req, res) {
  const requestId = req.params.requestId;
  try {
    const serviceRequest = await ServiceRequest.findById(requestId);
    if (!serviceRequest) return res.status(404).json({ error: 'Service request not found' });
    return res.json(serviceRequest);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleCreateServiceRequest(req, res) {
  const body = req.body;
  if (!body || !body.user_id || !body.sp_user_id || !body.description || !body.req_status || !body.time_date || !body.service_request) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newServiceRequest = await ServiceRequest.create({
      user_id: body.user_id,
      sp_user_id: body.sp_user_id,
      description: body.description,
      req_status: body.req_status,
      time_date: new Date(body.time_date),
      service_request: body.service_request,
    });
    await newServiceRequest.save(); // added this line on 27/2/24 (12:05 PM)
    res.status(201).json({ message: 'Success! New service request created' });
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' + error });
  }
}

async function handleUpdateServiceRequestById(req, res) {
  const requestId = req.params.requestId;
  const body = req.body;
  try {
    const updateServiceRequest = await ServiceRequest.findByIdAndUpdate(requestId, {
      user_id: body.user_id,
      sp_user_id: body.sp_user_id,
      description: body.description,
      req_status: body.req_status,
      time_date: new Date(body.time_date),
      service_request: body.service_request,
    });
    if (!updateServiceRequest) return res.status(404).json({ error: 'Service request not found' });
    return res.json(updateServiceRequest);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleDeleteServiceRequestById(req, res) {
  const requestId = req.params.requestId;
  try {
    const deleteServiceRequest = await ServiceRequest.findByIdAndDelete(requestId);
    if (!deleteServiceRequest) return res.status(404).json({ error: 'Service request not found' });
    return res.json({ message: 'Service request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export {
  handleGetAllServiceRequests,
  handleGetServiceRequestById,
  handleCreateServiceRequest,
  handleUpdateServiceRequestById,
  handleDeleteServiceRequestById,
};
