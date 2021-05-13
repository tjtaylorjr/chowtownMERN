
export const getAllRestaurants = async(page=0) => {
  try {
    const res = await fetch(`/api/v1/restaurants?page=${page}`, {
      "Content-type": "application/json",
    });
    if (!res.ok) {
      throw res;
    }
    const payload = await res.json();
    // return payload;
    // console.log(payload);
    // console.log(res.json());
    // const payload = res.data.restaurants;
    return payload.restaurants;
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
    const {
      text,
      name,
      user_id,
      restaurant_id
    } = data;
    const body = {
      "restaurant_id": restaurant_id,
      "name": name,
      "user_id": user_id,
      "text": text
    };
    const res = await fetch(`/api/v1/restaurants/review`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw res;
    }
    const payload = await res.json();
    // console.log(payload.status);
    return payload.status;
  } catch (err) {
    console.error(err);
  };
}

export const updateReview = async (data) => {
  try {
    const {
      text,
      name,
      user_id,
      review_id
    } = data;
    const body = {
      "review_id": review_id,
      "name": name,
      "user_id": user_id,
      "text": text
    };
    const res = await fetch(`/api/v1/restaurants/review`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw res;
    }
    const payload = await res.json();
    console.log(payload);
    return payload;
  } catch (err) {
    console.error(err);
  };
}

export const deleteReview = async (id, userId) => {
  const body ={
    "user_id": userId
  }
  try {
    const res = await fetch(`/api/v1/restaurants/review?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
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
