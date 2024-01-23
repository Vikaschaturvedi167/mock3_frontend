import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [sortedAppointments, setSortedAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/appointments');
        setAppointments(response.data);
        setSortedAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);

    const filteredAppointments = appointments.filter(appointment =>
      appointment.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setSortedAppointments(filteredAppointments);
  };

  const handleFilterChange = (event) => {
    setSpecializationFilter(event.target.value);

    const filteredAppointments = appointments.filter(appointment =>
      appointment.specialization.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setSortedAppointments(filteredAppointments);
  };

  const handleResetFilters = () => {
    setSearchName('');
    setSpecializationFilter('');
    setSortedAppointments(appointments);
  };

  const handleSortByDate = () => {
    const sortedByDate = [...sortedAppointments].sort((a, b) => new Date(a.date) - new Date(b.date));
    setSortedAppointments(sortedByDate);
  };

  const handleEdit = (appointmentId) => {
    console.log('Edit appointment with ID:', appointmentId);
   
  };

  const handleDelete = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:8000/appointments/${appointmentId}`);
      setSortedAppointments(sortedAppointments.filter(appointment => appointment._id !== appointmentId));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <div>
        <label htmlFor="searchName">Search by Name:</label>
        <input
          type="text"
          id="searchName"
          value={searchName}
          onChange={handleSearchNameChange}
        />
      </div>
      <div>
        <label htmlFor="specializationFilter">Filter by Specialization:</label>
        <select
          id="specializationFilter"
          value={specializationFilter}
          onChange={handleFilterChange}
        >
          <option value="">All Specializations</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Psychiatrist">Psychiatrist</option>
        </select>
      </div>
      <div>
        <button onClick={handleResetFilters}>Reset Filters</button>
        <button onClick={handleSortByDate}>Sort by Date</button>
      </div>
      <div>
        {sortedAppointments.map((appointment) => (
          <div key={appointment._id} className="appointment-card">
            <img src={appointment.imageUrl} alt={appointment.name} />
            <h3>{appointment.name}</h3>
            <p>Specialization: {appointment.specialization}</p>
            <p>Experience: {appointment.experience} years</p>
            <p>Location: {appointment.location}</p>
            <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
            <p>Slots: {appointment.slots}</p>
            <p>Fee: ${appointment.fee}</p>
            <button onClick={() => handleEdit(appointment._id)}>Edit</button>
            <button onClick={() => handleDelete(appointment._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;
