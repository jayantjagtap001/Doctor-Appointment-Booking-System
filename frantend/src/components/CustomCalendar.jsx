import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AppointmentModal from './AppointmentModal';
import { useAppointments } from '../contexts/AppointmentContext';

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const { appointments, deleteAppointment } = useAppointments();

  const handleDateClick = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
    setEditingAppointment(null); // Clear previous edit
    setIsModalOpen(true);
  };

  const openAppointments = appointments.filter(app => app.date === selectedDate);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Doctor Appointment Calendar
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6">
        <ReactCalendar onClickDay={handleDateClick} />
      </div>

      {selectedDate && (
        <div className="w-full max-w-md mt-6">
          <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Appointments on {selectedDate}
          </h3>
          {openAppointments.length === 0 ? (
            <p className="text-center text-gray-500">No appointments for this date.</p>
          ) : (
            openAppointments.map((app) => (
              <div
                key={app.id}
                className="bg-white shadow-md rounded-md p-4 mb-4 flex justify-between items-center"
              >
                <div>
                <p className="text-gray-700">Patient: {app.patientName || 'N/A'}</p>
                  <p className="font-semibold">Time: {app.time}</p>
                  <p className="text-gray-700">Doctor: {app.doctor || 'N/A'}</p>
                  <p className="text-gray-600">Reason: {app.description}</p>
                  <p className="text-gray-700">Contact: {app.contactNumber || 'N/A'}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingAppointment(app);
                      setSelectedDate(app.date);
                      setIsModalOpen(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAppointment(app.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {isModalOpen && (
        <AppointmentModal
          selectedDate={selectedDate}
          closeModal={() => {
            setIsModalOpen(false);
            setEditingAppointment(null);
          }}
          editingAppointment={editingAppointment}
        />
      )}
    </div>
  );
};

export default CustomCalendar;
