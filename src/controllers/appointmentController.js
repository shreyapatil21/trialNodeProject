// appointmentController.js
import Appointment from '../models/appointmentModel.js';

async function handleGetAllAppointments(req, res) {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleGetAppointmentById(req, res) {
  const appointmentId = req.params.appointmentId;
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    return res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleCreateAppointment(req, res) {
  const body = req.body;
  if (!body || !body.user_id || !body.topic || !body.description || !body.date_time || !body.appointment_status) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newAppointment = await Appointment.create({
      user_id: body.user_id,
      topic: body.topic,
      description: body.description,
      date_time: new Date(body.date_time),
      appointment_status: body.appointment_status,
    });

    res.status(201).json({ message: 'Success! New appointment created' });
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' + error });
  }
}

async function handleUpdateAppointmentById(req, res) {
  const appointmentId = req.params.appointmentId;
  const body = req.body;
  try {
    const updateAppointment = await Appointment.findByIdAndUpdate(appointmentId, {
      user_id: body.user_id,
      topic: body.topic,
      description: body.description,
      date_time: new Date(body.date_time),
      appointment_status: body.appointment_status,
    });
    if (!updateAppointment) return res.status(404).json({ error: 'Appointment not found' });
    return res.json(updateAppointment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleDeleteAppointmentById(req, res) {
  const appointmentId = req.params.appointmentId;
  try {
    const deleteAppointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!deleteAppointment) return res.status(404).json({ error: 'Appointment not found' });
    return res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export {
  handleGetAllAppointments,
  handleGetAppointmentById,
  handleCreateAppointment,
  handleUpdateAppointmentById,
  handleDeleteAppointmentById,
};
