import React, { useState, useEffect } from "react";
import { useAppointments } from "../contexts/AppointmentContext";

const doctorsList = [
  "Dr. Sharma",
  "Dr. Shinde",
  "Dr. Mulik",
  "Dr. Verma",
  "Dr. Patil",
];
const appointmentReasons = [
  "General Checkup",
  "Follow-up",
  "Consultation",
  "Prescription Refill",
  "Lab Results Review",
];

const AppointmentModal = ({ selectedDate, closeModal, editingAppointment }) => {
  const { addAppointment, editAppointment } = useAppointments();
  const [time, setTime] = useState("");
  const [doctor, setDoctor] = useState("");
  const [description, setDescription] = useState("");
  const [patientName, setPatientName] = useState(
    editingAppointment?.patientName || ""
  );
  const [contactNumber, setContactNumber] = useState(
    editingAppointment?.contactNumber || ""
  );

  useEffect(() => {
    if (editingAppointment) {
      setTime(editingAppointment.time);
      setDoctor(editingAppointment.doctor || "");
      setDescription(editingAppointment.description);
    } else {
      setTime("");
      setDoctor("");
      setDescription("");
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [editingAppointment]);

  const handleSave = () => {
    const appointmentData = {
      date: selectedDate,
      time,
      doctor,
      description,
      patientName,
      contactNumber,
    };

    if (editingAppointment) {
      editAppointment({ ...appointmentData, id: editingAppointment.id });
    } else {
      addAppointment(appointmentData);
    }

    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-4 md:max-w-md">
        <h3 className="text-lg font-bold mb-4 text-center text-gray-800">
          {editingAppointment
            ? "Edit Appointment"
            : `Add Appointment for ${selectedDate}`}
        </h3>
        <div className="mb-4">
          <label className="block font-medium mb-1">Patient Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Enter patient name"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Contact Number</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter contact number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Doctor</label>
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Doctor</option>
            {doctorsList.map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Reason</label>
          <select
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Reason</option>
            {appointmentReasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={closeModal}
            className="w-full py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
