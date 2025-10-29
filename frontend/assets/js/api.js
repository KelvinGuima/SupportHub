// Wrapper fetch (placeholder)
async function apiFetch(path, options = {}) {
  const base = '/api';
  const res = await fetch(`${base}${path}`, options);
  return res.json();
}