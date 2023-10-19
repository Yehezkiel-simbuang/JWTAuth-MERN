export const userMiddleware = (req, res) => {
    console.log("test");
    res.status(200).json({
        message: "Success",
        status: 200
    })
};