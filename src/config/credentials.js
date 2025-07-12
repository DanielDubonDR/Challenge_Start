import dotenv from 'dotenv';

dotenv.config();

// Configuracion el puerto de la API
export const API_PORT = process.env.API_PORT || 4000;

// Configuracion de variables de entorno para orígenes permitidos
export const ALLOWED_ORIGINS = () => {
  const origins = process.env.ALLOWED_ORIGINS;
  if (!origins) {
    return '*';
  }
  return origins.split(',').map(origin => origin.trim());
}