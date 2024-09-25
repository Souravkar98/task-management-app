import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Header() {
    const [date, setDate] = useState(null);
    const [error, setError] = useState(null);
  
    // Fetch the date from an API
    const fetchDate = async () => {
      try {
        const response = await axios.get('/api/');  // Use '/api' which will be proxied
        setDate(response.data.heading);
      } catch (err) {
        setError('Failed to fetch the date');
      }
    };
    
    useEffect(() => {
      fetchDate();
    }, []);
  return (
    <header>
    <h1> Personal Task Management App </h1>
    {error ? (
      <p style={{ color: 'red' }}>{error}</p>
    ) : (
      <p>Current Date: {date || 'Loading...'}</p>
    )}
  </header>
  )
}
