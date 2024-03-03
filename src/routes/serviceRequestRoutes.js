// serviceRequestRoutes.js
import express from 'express';
import { verifyJWT } from '../middleware/authMiddleware.js'
import {
  handleGetAllServiceRequests,
  handleGetServiceRequestById,
  handleCreateServiceRequest,
  handleUpdateServiceRequestById,
  handleDeleteServiceRequestById,
} from '../controllers/serviceRequestController.js';

const serviceRequestRoutes = express.Router();

serviceRequestRoutes.route('/')
  .get(verifyJWT,handleGetAllServiceRequests)
  .post(verifyJWT,handleCreateServiceRequest);

serviceRequestRoutes.route("/:requestId/:newStatus").get(verifyJWT,handleDeleteServiceRequestById);
serviceRequestRoutes.route('/:requestId')
  .get(verifyJWT,handleGetServiceRequestById)
  .put(verifyJWT,handleUpdateServiceRequestById);



export default serviceRequestRoutes;
