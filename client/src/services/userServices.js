export const authorizeUser = async (formData) => {
  try {
    const {email, password} = formData;
    const body = {
      "email": email,
      "password": password
    }
    //console.log(email,password)
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
    console.log(user)
    return user;
  } catch (err) {
    console.error(err);
  }
}
