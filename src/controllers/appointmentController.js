// appointmentController.js
import Appointment from '../models/appointmentModel.js';
import jwt from "jsonwebtoken"

async function handleGetAllAppointments(req, res) {
  const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (decoded.role == "Service Provider") {
        try {
            const sp_user_id = decoded._id;
            const appointmentDetails = await Appointment.find({ sp_user_id });
            return res.status(200).json(appointmentDetails);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

    } else if (decoded.role == "Admin") {
        try {
            const appointmentDetails = await Appointment.find();
            return res.status(200).json(appointmentDetails);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }else if (decoded.role == "Client") {
      try {
          const user_id = decoded._id;
          const appointmentDetails = await Appointment.find({ user_id });
          return res.status(200).json(appointmentDetails);
      } catch (error) {
          return res.status(500).json({ error: 'Internal Server Error' });
      }

  } else {
        return res.status(401).json({ error: 'Unauthorized Access' });
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
  if (!body || !body.sp_user_id|| !body.topic || !body.description || !body.date_time ) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const uid = decoded._id;
  try {
    const newAppointment = await Appointment.create({
      user_id: uid,
      sp_user_id: body.sp_user_id,
      topic: body.topic,
      description: body.description,
      date_time: new Date(body.date_time),
      appointment_status: "Pending",
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
