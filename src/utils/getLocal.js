export function getKeep() {
  const keep = localStorage.getItem('keep') || '{}'
  return JSON.parse(keep)
}

export function setKeep(keep) {
  localStorage.setItem('keep', JSON.stringify(keep))
}