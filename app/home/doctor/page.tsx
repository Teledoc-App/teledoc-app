'use client'

import axios from 'axios';
import useSWR, { mutate } from 'swr';
import AcceptDenyButton from '@/components/AcceptDenyButton';

interface DoctorAppointment {
  id: string;
  patient: {
    name: string;
    image: string;
  };
  reason: string;
  description: string;
  date: string;
  time: string;
  statusId: string;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const DoctorAppointments = () => {
  const { data: appointments, error } = useSWR('../../api/users/me', fetcher);

  const handleAccept = async (appointment: DoctorAppointment) => {
    try {
      appointment.statusId = '6d86abcc-f29b-4a64-9af4-4b55c4f1ee2b';
      await axios.patch(`../../api/appointment/${appointment.id}`, appointment);
      mutate('../../api/users/me');
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleDeny = async (appointment: DoctorAppointment) => {
    try {
      appointment.statusId = 'e209365d-44ef-4c5d-8eea-42c827dbaeb1';
      await axios.patch(`/api/appointment/${appointment.id}`, appointment);
      mutate('/api/users/me');
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  if (error) return <div>Error fetching data</div>;
  if (!appointments) return <div>Loading...</div>;

  return (
    <div className="appointment-list">
      {appointments?.data?.user?.doctorAppointments.map((appointment: DoctorAppointment) => (
        <AcceptDenyButton
          key={appointment.id}
          data={{
            patientName: appointment.patient.name,
            patientImage: appointment.patient.image,
            reason: appointment.reason,
            description: appointment.description,
            date: appointment.date,
            time: appointment.time,
          }}
          onAccept={() => handleAccept(appointment)}
          onDeny={() => handleDeny(appointment)}
        />
      ))}
    </div>
  );
};

export default DoctorAppointments;


