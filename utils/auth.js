import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // In production, use environment variable

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

export function isAuthenticated(request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return false;
  }
  const { valid } = verifyToken(token);
  return valid;
}
