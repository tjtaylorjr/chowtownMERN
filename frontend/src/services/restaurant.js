
export const getAllRestaurants = async(page = 0) => {
  const res = await fetch(`/api/v1/restaurants?page=${page}`,{
    "Content-type": "application/json",
  });
  const payload = await res.json();
  return payload;
}

export const getRestaurantById = async (id) => {
  const res = await fetch(`/api/v1/restaurants/id/${id}`, {
    "Content-type": "application/json",
  });
  const payload = await res.json();
  return payload;
}

export const findRestaurants = async (query, by, page = 0) => {
  const res = await fetch(`/api/v1/restaurants?${by}=${query}&page=${page}`, {
    "Content-type": "application/json",
  });
  const payload = await res.json();
  return payload;
}

export const addReview = async (data) => {
  const { placeholder } = data;
  const res = await fetch(`/api/v1/restaurants/review`, {
    method: "POST",
    "Content-type": "application/json",
    body: {
      //placeholder: placeholder,
    },
  });
  const payload = await res.json();
  return payload;
}

export const updateReview = async (data) => {
  const { placeholder } = data;
  const res = await fetch(`/api/v1/restaurants/review`, {
    method: "PUT",
    "Content-type": "application/json",
    body: {
      //placeholder: placeholder,
    },
  });
  const payload = await res.json();
  return payload;
}

export const deleteReview = async (id) => {
  const res = await fetch(`/api/v1/restaurants/review?id=${id}`, {
    method: "DELETE",
    "Content-type": "application/json",
  });
  const payload = await res.json();
  return payload;
}

export const getCuisines = async (id) => {
  const res = await fetch(`/api/v1/restaurants/cuisines`, {
    "Content-type": "application/json",
  });
  const payload = await res.json();
  return payload;
}
