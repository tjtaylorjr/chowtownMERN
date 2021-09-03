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
    return user;
  } catch (err) {
    console.error(err);
  }
}

export const authorizeWithGoogle = async (email) => {
  try {
    const res = await fetch(`/api/v1/users`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({email}),
    });

    if(!res.ok) {
      throw res;
    }

    const { _id, username } = await res.json();

    return { _id, username };
  } catch (err) {
    console.error(err);
  }
}

export const registerUser = async (formData) => {
  console.log(formData)
  try {
    const { email, username, givenName, familyName, password } = formData;
    const imageUrl = formData.imageUrl ? formData.imageUrl : null;
    const body = {
      "email": email,
      "password": password,
      "username": username,
      "givenName": givenName,
      "familyName": familyName,
      "name": `${givenName} ${familyName}`,
      "imageUrl": imageUrl
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

export const getGeoApi = async () => {
  try {
    const res = await fetch(`/api/v1/users/geo_api`);

    if (!res.ok) {
      throw res;
    }

    const api = await res.json();
    return api;
  } catch (err) {
    console.error(err);
  }
}


export const getOAuthClient = async () => {
  try {
    const res = await fetch(`/api/v1/users/OAuth_client`);

    if (!res.ok) {
      throw res;
    }

    const OAuthClient = await res.json();
    return OAuthClient;
  } catch (err) {
    console.error(err);
  }
}

export const getOAuthSecret = async () => {
  try {
    const res = await fetch(`/api/v1/users/OAuth_secret`);

    if (!res.ok) {
      throw res;
    }

    const OAuthSecret = await res.json();
    return OAuthSecret;
  } catch (err) {
    console.error(err);
  }
}
