export const authorizeUser = async (formData) => {
  try {
    const {email, password} = formData;
    const body = {
      "email": email,
      "password": password
    }
    const res = await fetch(`/api/v1/users/login`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
    });

    if(!res.ok) {
      throw res;
    }

    const user = await res.json();
    //console.log(user)
    return user;
  } catch (err) {
    console.error(err);
  }
}

export const registerUser = async (formData) => {
  try {
    const { email, username, firstname, lastname, password } = formData;
    const body = {
      "email": email,
      "username": username,
      "firstname": firstname,
      "lastname": lastname,
      "password": password
    }
    const res = await fetch(`/api/v1/users/signup`,
      {
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
    console.error(err);
  }
}

export const restoreUser = async (jwt) => {
  try {
    const res = await fetch(`/api/v1/users/restore`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(jwt),
      });

    if (!res.ok) {
      throw res;
    }

    const user = await res.json();
    return user;
  } catch (err) {
    console.error(err);
  }
}
