export const authorizeUser = async(formData) => {
  try {
    const res = await fetch(`/api/v1/auth/login`)
  } catch (err) {
    console.error(err);
  }
}
