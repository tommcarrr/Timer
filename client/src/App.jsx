import { Routes, Route, Link } from 'react-router-dom';
import CreateEvent from './CreateEvent.jsx';
import EventPage from './EventPage.jsx';
import './App.css';

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/create">Create Event</Link>
      </nav>
      <Routes>
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="*" element={<CreateEvent />} />
      </Routes>
    </div>
  );
}
