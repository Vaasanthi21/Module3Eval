export default function RestaurantCard({
  restaurant,
  isAdmin,
  onUpdate,
  onDelete
}) {
  const { image, restaurantName, address, type, parkingLot, restaurantID } = restaurant;
  return (
    <div className="card">
      <img src={image} alt={restaurantName} />
      <div className="card-body">
        <div><strong>Name:</strong> {restaurantName}</div>
        <div><strong>Address:</strong> {address}</div>
        <div><strong>Type:</strong> {type}</div>
        <div><strong>Parking:</strong> {parkingLot ? 'Available' : 'Not available'}</div>
        {isAdmin && (
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
            <button className="button" onClick={() => onUpdate(restaurantID)}>Update</button>
            <button className="button secondary" onClick={() => onDelete(restaurantID)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
