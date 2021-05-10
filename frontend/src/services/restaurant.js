
export const getAllRestaurants = async(page = 0) => {
  try {
    const res = await fetch(`/api/v1/restaurants?page=${page}`,{
      "Content-type": "application/json",
    });
    if (!res.ok) {
      throw res;
    }
    const payload = await res.json();
    return payload;
  } catch (err) {
    console.log(`Unable to locate any restaurants. ${err}`);
  };
}

export const getRestaurantById = async (id) => {
  try {
    const res = await fetch(`/api/v1/restaurants/id/${id}`, {
      "Content-type": "application/json",
    });
    if (!res.ok) {
      throw res;
    }
    const payload = await res.json();
    return payload;
  } catch (err) {
    console.log(`Unable to locate restaurant. ${err}`);
  };
}

export const findRestaurants = async (query, by, page = 0) => {
  try {
    const res = await fetch(`/api/v1/restaurants?${by}=${query}&page=${page}`, {
      "Content-type": "application/json",
    });
    if (!res.ok) {
      throw res;
    }
    const payload = await res.json();
    return payload;
  } catch (err) {
    console.error(err);
  };
}

export const addReview = async (data) => {
  try {
    const { placeholder } = data;
    const res = await fetch(`/api/v1/restaurants/review`, {
      method: "POST",
      "Content-type": "application/json",
      body: {
        //placeholder: placeholder,
      },
    });
    if (!res.ok) {
      throw res;
    }
    const payload = await res.json();
    return payload;
  } catch (err) {
    console.error(err);
  };
}

export const updateReview = async (data) => {
  try {
    const { placeholder } = data;
    const res = await fetch(`/api/v1/restaurants/review`, {
      method: "PUT",
      "Content-type": "application/json",
      body: {
        //placeholder: placeholder,
      },
    });
    if (!res.ok) {
      throw res;
    }
    const payload = await res.json();
    return payload;
  } catch (err) {
    console.error(err);
  };
}

export const deleteReview = async (id) => {
  try {
    const res = await fetch(`/api/v1/restaurants/review?id=${id}`, {
      method: "DELETE",
      "Content-type": "application/json",
    });
    if (!res.ok) {
      throw res;
    }
    const payload = await res.json();
    return payload;
  } catch (err) {
    console.error(err);
  };
}

export const getCuisines = async (id) => {
  try {
    const res = await fetch(`/api/v1/restaurants/cuisines`, {
      "Content-type": "application/json",
    });
    if (!res.ok) {
      throw res;
    }
    const payload = await res.json();
    return payload;
  } catch (err) {
    console.log(`Unable to find cuisines. ${err}`);
  };
}
