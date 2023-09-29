// Card.js

import { useState } from 'react';
import Image from 'next/image';

interface AcceptDenyButtonProps {
    data: {
      patientName: string;
      patientImage: string;
      reason: string;
      description: string;
      date: string;
      time: string;
    };
    onAccept: (data: any) => void; 
    onDeny: (data: any) => void; 
  }
  
  const AcceptDenyButton: React.FC<AcceptDenyButtonProps> = ({ data, onAccept, onDeny }) => {
    const { patientName, patientImage, reason, description, date, time } = data;
  const [status, setStatus] = useState('');

  const handleAccept = () => {
    setStatus('accepted');
    onAccept(data);
  };

  const handleDeny = () => {
    setStatus('rejected');
    onDeny(data);
  };

  return (
    <div className="card">
      <Image width={150} height={150} className="w-20 h-20 rounded-full" src={patientImage} alt={patientName} />
      <h3>{patientName}</h3>
      <p>Reason: {reason}</p>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p>Description: {description}</p>
      <button onClick={handleAccept}>Accept ❌ </button>
      <button onClick={handleDeny}>Deny ✔️ </button>
      {status && <p>Status: {status}</p>}
    </div>
  );
};

export default AcceptDenyButton;
