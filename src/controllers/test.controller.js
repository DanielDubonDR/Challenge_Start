export const ping = async (req, res) => {
    res.send({ message: "pong" });
};

export const pong = async (req, res) => {
    console.log(req.body);
};