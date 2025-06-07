import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function countdown(target) {
  const diff = new Date(target) - new Date();
  if (diff <= 0) return 'Event started!';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    fetch(`/api/events/${id}`).then(res => res.json()).then(data => {
      setEvent(data);
    });
  }, [id]);

  useEffect(() => {
    if (!event) return;
    const timer = setInterval(() => {
      setTime(countdown(event.datetime));
    }, 1000);
    return () => clearInterval(timer);
  }, [event]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <h3>{time}</h3>
    </div>
  );
}
