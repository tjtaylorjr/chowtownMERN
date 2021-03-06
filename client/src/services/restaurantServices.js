
export const getAllRestaurants = async (page=0) => {
  try {
    const res = await fetch(`/api/v1/restaurants?page=${page}`, {
      "Content-type": "application/json",
    });
    if (!res.ok) {
      throw res;
    }
    const payload = await res.json();
    return payload.restaurants;
  } catch (err) {
    console.log(`Unable to locate any restaurants. ${err}`);
  };
}

export const getRestaurantId = async (api_id) => {
  try {
    const res = await fetch(`/api/v1/restaurants/api_id/${api_id}`, {
      "Content-Type": "application/json",
    });
    if(!res.ok) {
      throw res
    }
    const payload = await res.json();
    return payload;
  } catch (err) {
    console.log(`No record found. ${err}`);
    return {message: 'Please Create Record'}
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

// export const findRestaurants = async (query, by, page = 0) => {
//   try {
//     const res = await fetch(`/api/v1/restaurants?${by}=${query}&page=${page}`, {
//       "Content-type": "application/json",
//     });
//     if (!res.ok) {
//       throw res;
//     }
//     const payload = await res.json();
//     return payload.restaurants;
//   } catch (err) {
//     console.error(err);
//   };
// }

export const findRestaurants = async (searchInput, lat, lon, page = 0) => {
  try {
    const res = await fetch(`/api/v1/restaurants/search?q=${searchInput}&lat=${lat}&lon=${lon}&page=${page}`, {
      "Content-type": "application/json",
    });
    if (!res.ok) {
      throw res;
    }
    const payload = await res.json();
    return payload.restaurants;
  } catch (err) {
    console.error(err);
  };
}

export const addRestaurant = async (data) => {
  try {
    const {
      api_id,
      address,
      phone,
      cuisine,
      rating,
      name
    } = data;

    const body = {
      name,
      address,
      phone,
      rating,
      cuisine,
      api_id
    };
    const res = await fetch(`/api/v1/restaurants/post`,{
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
    return payload;
  } catch (err) {
    console.error(`Unable to post restaurant profile: ${err}`);
    return { error: err };
  }
};

export const getExternalReviews = async (api_id) => {
  try {
    const res = await fetch(`/api/v1/restaurants/review/external/${api_id}`, {
      "Content-Type": "application/json",
    });

    if (!res.ok) {
      throw res;
    }
    const payload = await res.json();
    return payload;
  } catch (err) {
    console.error(`Unable to check external reviews: ${err}`);
  };

}

export const addReview = async (data) => {
  try {
    console.log(data);
    const {
      title,
      text,
      name,
      user_id,
      restaurant_id,
      AWSUploadUrl,
      imageName,
      imageFile,
      imageUrl,
      rating
    } = data;

    await fetch(AWSUploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: imageFile
    });

    const body = {
      restaurant_id,
      name,
      user_id,
      title,
      text,
      imageName,
      imageUrl,
      rating
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
    return payload.status;
  } catch (err) {
    console.error(err);
  };
}

export const updateReview = async (data) => {
  try {
    let imageName;
    let imageUrl;

    ({
      imageName,
      imageUrl
    } = data);

    const {
      title,
      text,
      name,
      user_id,
      review_id,
      AWSUploadUrl,
      imageFile,
      rating,
      originalImageUrl,
      originalImageName,
    } = data;

    if(imageFile) {

      const imageKey = originalImageUrl.split('/')[3];

      try {
        await fetch(`/api/v1/restaurants/review/image/${imageKey}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
      } catch (err) {
        console.error(err);
      }

      await fetch(AWSUploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: imageFile
      });
    } else {
      imageName = originalImageName;
      imageUrl = originalImageUrl;
    }


    const body = {
      review_id,
      name,
      user_id,
      title,
      text,
      imageName,
      imageUrl,
      rating
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
