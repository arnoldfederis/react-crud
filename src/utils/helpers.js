export const set = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value))
}

export const get = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    return false
  }
}

export const remove = (key) => {
  return localStorage.removeItem(key)
}
