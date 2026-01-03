import { useEffect, useState } from 'react';
import { getEvalData, updateRestaurant } from '../../utils/storage';
import { useNavigate, useSearchParams } from 'react-router-dom';

const TYPES = [
  'Rajasthani',
  'Gujarati',
  'Mughlai',
  'Jain',
  'Thai',
  'North Indian',
  'South Indian',
];

export default function AdminUpdate() {
  const [params] = useSearchParams();
  const id = Number(params.get('id'));
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const data = getEvalData();
    const found = data.restaurants.find(r => r.restaurantID === id);
    setForm(found || null);
  }, [id]);

  if (!form) {
    return <div className="container">Restaurant not found.</div>;
  }

  const handleChange = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = e => {
    e.preventDefault();
    const { restaurantName, address, type, image } = form;
    if (!restaurantName.trim() || !address.trim() || !type.trim() || !image.trim()) {
      alert('Please fill all required fields.');
      return;
    }
    const ok = window.confirm('Confirm update?');
    if (!ok) return;

    const payload = {
      ...form,
      restaurantName: restaurantName.trim(),
      address: address.trim(),
      parkingLot: form.parkingLot === true || form.parkingLot === 'true',
    };
    updateRestaurant(payload);
    alert('Updated successfully.');
    navigate('/admin/dashboard', { replace: true });
  };

  return (
    <div className="container" style={{ maxWidth: 700 }}>
      <h2>Update restaurant</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          value={form.restaurantName}
          onChange={e => handleChange('restaurantName', e.target.value)}
          placeholder="Restaurant name"
        />
        <input
          className="input"
          style={{ marginTop: '0.5rem' }}
          value={form.address}
          onChange={e => handleChange('address', e.target.value)}
          placeholder="Address"
        />
        <select
          className="select"
          style={{ marginTop: '0.5rem' }}
          value={form.type}
          onChange={e => handleChange('type', e.target.value)}
        >
          {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select
          className="select"
          style={{ marginTop: '0.5rem' }}
          value={String(form.parkingLot)}
          onChange={e => handleChange('parkingLot', e.target.value === 'true')}
        >
          <option value="true">Parking available</option>
          <option value="false">No parking</option>
        </select>
        <input
          className="input"
          style={{ marginTop: '0.5rem' }}
          value={form.image}
          onChange={e => handleChange('image', e.target.value)}
          placeholder="Image URL"
        />
        <button className="button" type="submit" style={{ marginTop: '0.75rem' }}>
          Update
        </button>
      </form>
    </div>
  );
}
