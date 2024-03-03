// appointmentRoutes.js
import express from 'express';
import { verifyJWT } from '../middleware/authMiddleware.js'
import {
  handleGetAllAppointments,
  handleGetAppointmentById,
  handleCreateAppointment,
  handleUpdateAppointmentById,
  handleDeleteAppointmentById,
} from '../controllers/appointmentController.js';

const appointmentRoutes = express.Router();

appointmentRoutes.route('/')
  .get(verifyJWT,handleGetAllAppointments)
  .post(verifyJWT,handleCreateAppointment);

appointmentRoutes.route('/:appointmentId')
  .get(verifyJWT,handleGetAppointmentById)
  .put(verifyJWT,handleUpdateAppointmentById)
  .delete(verifyJWT,handleDeleteAppointmentById);

export default appointmentRoutes;
