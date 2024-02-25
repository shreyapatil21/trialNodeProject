// appointmentRoutes.js
import express from 'express';
import {
  handleGetAllAppointments,
  handleGetAppointmentById,
  handleCreateAppointment,
  handleUpdateAppointmentById,
  handleDeleteAppointmentById,
} from '../controllers/appointmentController.js';

const appointmentRoutes = express.Router();

appointmentRoutes.route('/')
  .get(handleGetAllAppointments)
  .post(handleCreateAppointment);

appointmentRoutes.route('/:appointmentId')
  .get(handleGetAppointmentById)
  .put(handleUpdateAppointmentById)
  .delete(handleDeleteAppointmentById);

export default appointmentRoutes;
