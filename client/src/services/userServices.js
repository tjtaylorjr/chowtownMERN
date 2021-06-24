export const authorizeUser = async(formData) => {
  try {
    const res = await fetch(`/api/v1/users/login`)
  } catch (err) {
    console.error(err);
  }
}
