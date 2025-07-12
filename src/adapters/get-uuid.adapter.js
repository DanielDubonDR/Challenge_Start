import { v4 as uuidv4 } from 'uuid';

// Adaptador/plugin para obtener un UUID
export const getUUID = () => {
    return uuidv4();
}