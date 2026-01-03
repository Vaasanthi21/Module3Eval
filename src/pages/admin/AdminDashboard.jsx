import { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/Navbar';
import RestaurantCard from '../../components/RestaurantCard';
import AdminAddForm from '../../components/AdminAddForm';
import { addRestaurant, deleteRestaurant, getEvalData, seedIfEmpty } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [data, setData] = useState({ restaurants: [] });
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const [parking, setParking] = useState('All');
  const navigate = useNavigate();

  const load = () => setData(getEvalData());

  useEffect(() => {
    seedIfEmpty();
    load();
  }, []);

  const handleAdd = rest => {
    addRestaurant(rest);
    load();
  };

  const handleDelete = id => {
    const ok = window.confirm('Are you sure you want to delete?');
    if (!ok) return;
    deleteRestaurant(id);
    alert('Deleted successfully.');
    load();
  };

  const handleUpdateNavigate = id => {
    navigate(`/admin/restaurants/update?id=${id}`);
  };

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return data.restaurants.filter(r => {
      const typeOk = type === 'All' ? true : r.type === type;
      const parkOk =
        parking === 'All' ? true :
        parking === 'true' ? r.parkingLot === true :
        r.parkingLot === false;
      const searchOk =
        !s ||
        r.restaurantName.toLowerCase().includes(s) ||
        r.address.toLowerCase().includes(s);
      return typeOk && parkOk && searchOk;
    });
  }, [data, search, type, parking]);

  const clearFilters = () => {
    setSearch('');
    setType('All');
    setParking('All');
  };

  return (
    <div>
      <Navbar
        search={search} setSearch={setSearch}
        type={type} setType={setType}
        parking={parking} setParking={setParking}
        onClear={clearFilters}
      />
      <div className="container flex">
        <AdminAddForm onAdd={handleAdd} />
        <div className="content">
          <div className="card-grid">
            {filtered.map(r => (
              <RestaurantCard
                key={r.restaurantID}
                restaurant={r}
                isAdmin
                onUpdate={handleUpdateNavigate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
