// appointmentModel.js
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
{
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
  topic: { type: String, required: true },
  description: { type: String, required: true },
  date_time: { type: Date, required: true },
  appointment_status: { type: String, enum: ['Approved', 'Rejected', 'Pending'], required: true },
});

const Appointment = mongoose.model('appointment', appointmentSchema);

export default Appointment;
