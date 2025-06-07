import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [datetime, setDatetime] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, datetime })
    });
    const data = await res.json();
    if (res.ok) {
      setUrl(window.location.origin + data.url);
      navigate(`/event/${data.id}`);
    } else {
      alert(data.error || 'error');
    }
  };

  return (
    <div className="container">
      <h2>Create Event</h2>
      <form onSubmit={submit}>
        <div>
          <label>Title</label><br />
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label><br />
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Date & Time</label><br />
          <input type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} required />
        </div>
        <button type="submit">Create</button>
      </form>
      {url && <p>URL: <a href={url}>{url}</a></p>}
    </div>
  );
}
