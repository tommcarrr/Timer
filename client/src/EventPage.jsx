import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import confetti from 'canvas-confetti';

function contrastColor(hex) {
  if (!hex) return '#000';
  const c = hex.replace('#', '');
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000' : '#fff';
}

function countdown(target) {
  const diff = new Date(target) - new Date();
  if (diff <= 0) return 'Event started!';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function launchConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      zIndex: 999
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      zIndex: 999
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [time, setTime] = useState('');
  const [hasCelebrated, setHasCelebrated] = useState(false);

  useEffect(() => {
    fetch(`/api/events/${id}`).then(res => res.json()).then(data => {
      setEvent(data);
    });
  }, [id]);

  useEffect(() => {
    if (!event) return;
    const timer = setInterval(() => {
      const t = countdown(event.datetime);
      setTime(t);
      if (t === 'Event started!' && !hasCelebrated) {
        setHasCelebrated(true);
        launchConfetti();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [event, hasCelebrated]);

  if (!event) return <p>Loading...</p>;

  const textColor = contrastColor(event.bgColor || '#ffffff');
  const styles = {
    backgroundColor: event.bgColor || '#ffffff',
    color: textColor,
    minHeight: '100vh'
  };

  return (
    <div className="d-flex flex-column justify-content-center text-center" style={styles}>
      <div className="container py-4">
        <h2 className="mb-3">{event.title}</h2>
        <p className="lead">{event.description}</p>
        <h3>{time}</h3>
      </div>
    </div>
  );
}
