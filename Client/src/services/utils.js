const API_BASE = import.meta.env.MODE === 'development'
  ? 'http://localhost:8000'
  : '';

export function getImageUrl(imagePath) {
  if (!imagePath) return '';
  // If it's already a full URL (http/https), return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // If it's a relative path (e.g., /uploads/...), prepend the backend URL in dev
  return `${API_BASE}${imagePath}`;
}
