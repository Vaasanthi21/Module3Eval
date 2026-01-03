import { useState } from 'react';

const TYPES = [
  'Rajasthani',
  'Gujarati',
  'Mughlai',
  'Jain',
  'Thai',
  'North Indian',
  'South Indian',
];

const DEFAULT_IMAGE =
  "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg";

export default function AdminAddForm({ onAdd }) {
  const [form, setForm] = useState({
    restaurantName: '',
    address: '',
    type: TYPES[0],
    parkingLot: 'true',
    image: DEFAULT_IMAGE,
  });

  const handleChange = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = e => {
    e.preventDefault();
    const { restaurantName, address, type, parkingLot, image } = form;
    if (!restaurantName.trim() || !address.trim() || !type.trim() || !image.trim()) {
      alert('Please fill all required fields.');
      return;
    }
    const restaurantID = Date.now(); // simple auto-ID
    onAdd({
      restaurantID,
      restaurantName: restaurantName.trim(),
      address: address.trim(),
      type,
      parkingLot: parkingLot === 'true',
      image,
    });
    alert('Restaurant added successfully.');
    // Clear form
    setForm({
      restaurantName: '',
      address: '',
      type: TYPES[0],
      parkingLot: 'true',
      image: DEFAULT_IMAGE,
    });
  };

  return (
    <form className="sidebar" onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 0 }}>Add restaurant</h3>
      <input
        className="input"
        placeholder="Restaurant name"
        value={form.restaurantName}
        onChange={e => handleChange('restaurantName', e.target.value)}
      />
      <input
        className="input"
        placeholder="Address"
        value={form.address}
        onChange={e => handleChange('address', e.target.value)}
        style={{ marginTop: '0.5rem' }}
      />
      <select
        className="select"
        value={form.type}
        onChange={e => handleChange('type', e.target.value)}
        style={{ marginTop: '0.5rem' }}
      >
        {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <select
        className="select"
        value={form.parkingLot}
        onChange={e => handleChange('parkingLot', e.target.value)}
        style={{ marginTop: '0.5rem' }}
      >
        <option value="true">Parking available</option>
        <option value="false">No parking</option>
      </select>
      <input
        className="input"
        placeholder="Image URL"
        value={form.image}
        onChange={e => handleChange('image', e.target.value)}
        style={{ marginTop: '0.5rem' }}
      />
      <button className="button" type="submit" style={{ marginTop: '0.75rem' }}>
        Add
      </button>
    </form>
  );
}
