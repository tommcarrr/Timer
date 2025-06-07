import { Routes, Route, Link } from 'react-router-dom';
import CreateEvent from './CreateEvent.jsx';
import EventPage from './EventPage.jsx';
import './App.css';

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/create">Event Timer</Link>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="*" element={<CreateEvent />} />
        </Routes>
      </div>
    </div>
  );
}
