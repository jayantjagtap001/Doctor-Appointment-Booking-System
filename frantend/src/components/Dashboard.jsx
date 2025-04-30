import React, { useState } from "react";
import { useAppointments } from "../contexts/AppointmentContext";
import AppointmentModal from "./AppointmentModal";

const Dashboard = () => {
  const { appointments, deleteAppointment } = useAppointments();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    setSelectedAppointment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Appointments</h2>

      <button
        onClick={handleAdd}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        Add New Appointment
      </button>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">All Appointments</h3>
        {appointments.length === 0 ? (
          <p>No appointments available.</p>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300"
            >
              <div>
                <h3 className="font-semibold text-xl">{appointment.date}</h3>
                <p>
                  <strong>Patient:</strong> {appointment.patientName || "N/A"}
                </p>
                <p>
                  <strong>Time:</strong> {appointment.time}
                </p>
                <p>
                  <strong>Doctor:</strong> {appointment.doctor || "N/A"}
                </p>
                <p>
                  <strong>Reason:</strong> {appointment.description}
                </p>
                <p>
                  <strong>Contact:</strong> {appointment.contactNumber || "N/A"}
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(appointment)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteAppointment(appointment.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <AppointmentModal
          selectedDate={selectedAppointment?.date || ""}
          closeModal={closeModal}
          editingAppointment={selectedAppointment}
        />
      )}
    </div>
  );
};

export default Dashboard;
