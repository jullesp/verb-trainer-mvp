export const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]
export const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)
export const normalise = (s) => (s ?? '').trim().toLowerCase()
