import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [datetime, setDatetime] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, datetime, bgColor })
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
    <div className="py-4">
      <h2 className="mb-4">Create Event</h2>
      <form onSubmit={submit} className="mb-3">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Date &amp; Time</label>
          <input className="form-control" type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Background Color</label>
          <input className="form-control form-control-color" type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Create</button>
      </form>
      {url && <p>URL: <a href={url}>{url}</a></p>}
    </div>
  );
}
