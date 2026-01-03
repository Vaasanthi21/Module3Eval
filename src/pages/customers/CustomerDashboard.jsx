import { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/Navbar';
import RestaurantCard from '../../components/RestaurantCard';
import { getEvalData, seedIfEmpty } from '../../utils/storage';

export default function CustomerDashboard() {
  const [data, setData] = useState({ restaurants: [] });
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const [parking, setParking] = useState('All');

  const load = () => setData(getEvalData());

  useEffect(() => {
    seedIfEmpty();
    load();
  }, []);

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
      <div className="container">
        <div className="card-grid">
          {filtered.map(r => (
            <RestaurantCard
              key={r.restaurantID}
              restaurant={r}
              isAdmin={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
