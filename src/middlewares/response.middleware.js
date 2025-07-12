
// Middleware para manejar respuestas de la API
const response = (req, res, next) => {
    res.response = (data, message = 'ok', status = 200) => {
        const response = {
            message,
            data
        }
        res.status(status).json(response);
    }

    next();
}

export default response;