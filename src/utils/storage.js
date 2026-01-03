const KEY = 'evalData';

export function getEvalData() {
  const raw = localStorage.getItem(KEY);
  try {
    return raw ? JSON.parse(raw) : { user: null, restaurants: [] };
  } catch {
    return { user: null, restaurants: [] };
  }
}

export function setEvalData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function seedIfEmpty() {
  const data = getEvalData();
  if (!data.restaurants || data.restaurants.length === 0) {
    data.restaurants = [
      {
        restaurantID: 26,
        restaurantName: "1135 AD",
        address: "Jaipur, Amber Fort, Rajasthan",
        type: "Rajasthani",
        parkingLot: true,
        image:
          "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg",
      },
    ];
    setEvalData(data);
  }
}

export function addRestaurant(rest) {
  const data = getEvalData();
  data.restaurants.push(rest);
  setEvalData(data);
}

export function updateRestaurant(updated) {
  const data = getEvalData();
  data.restaurants = data.restaurants.map(r =>
    r.restaurantID === updated.restaurantID ? updated : r
  );
  setEvalData(data);
}

export function deleteRestaurant(id) {
  const data = getEvalData();
  data.restaurants = data.restaurants.filter(r => r.restaurantID !== id);
  setEvalData(data);
}
