import React, { createContext, useContext, useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, set, push, onValue, remove } from "firebase/database";

const AppointmentContext = createContext();

export const useAppointments = () => useContext(AppointmentContext);

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const appointmentsRef = ref(database, "appointments");
    const unsubscribe = onValue(appointmentsRef, (snapshot) => {
      const data = snapshot.val();
      const fetched = [];

      for (let id in data) {
        fetched.push({ id, ...data[id] }); 
      }

      setAppointments(fetched);
    });

    return () => unsubscribe();
  }, []);

  const addAppointment = (appointment) => {
    const appointmentsRef = ref(database, "appointments");
    const newAppointmentRef = push(appointmentsRef); 
    
    set(newAppointmentRef, appointment)
      .then(() => alert("Appointment added successfully!"))
      .catch((error) => console.error("Error adding appointment:", error));
  };

  const editAppointment = (appointment) => {
    if (!appointment.id) {
      console.warn("Missing appointment ID");
      return;
    }

    const appointmentRef = ref(database, `appointments/${appointment.id}`);
    set(appointmentRef, {
      date: appointment.date,
      time: appointment.time,
      doctor: appointment.doctor,
      description: appointment.description,
      patientName: appointment.patientName,
      contactNumber: appointment.contactNumber,
    })
      .then(() => alert("Appointment updated successfully!"))
      .catch((error) => {
        console.error("Firebase update error:", error);
      });
  };

  const deleteAppointment = (id) => {
    const appointmentRef = ref(database, `appointments/${id}`);
    remove(appointmentRef).catch((error) =>
      console.error("Error deleting appointment:", error)
    );
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        editAppointment,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
