import { useEffect, useRef } from 'react';

const TYPES = [
  'All',
  'Rajasthani',
  'Gujarati',
  'Mughlai',
  'Jain',
  'Thai',
  'North Indian',
  'South Indian',
];

export default function Navbar({
  search, setSearch,
  type, setType,
  parking, setParking,
  onClear
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="navbar">
      <input
        ref={inputRef}
        className="input"
        placeholder="Search by name or address..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select className="select" value={type} onChange={e => setType(e.target.value)}>
        {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <select className="select" value={parking} onChange={e => setParking(e.target.value)}>
        <option value="All">All Parking</option>
        <option value="true">Has Parking</option>
        <option value="false">No Parking</option>
      </select>
      <button className="button secondary" onClick={onClear}>Clear</button>
    </div>
  );
}
