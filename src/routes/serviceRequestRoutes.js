// serviceRequestRoutes.js
import express from 'express';
import {
  handleGetAllServiceRequests,
  handleGetServiceRequestById,
  handleCreateServiceRequest,
  handleUpdateServiceRequestById,
  handleDeleteServiceRequestById,
} from '../controllers/serviceRequestController.js';

const serviceRequestRoutes = express.Router();

serviceRequestRoutes.route('/')
  .get(handleGetAllServiceRequests)
  .post(handleCreateServiceRequest);

serviceRequestRoutes.route('/:requestId')
  .get(handleGetServiceRequestById)
  .put(handleUpdateServiceRequestById)
  .delete(handleDeleteServiceRequestById);

export default serviceRequestRoutes;
