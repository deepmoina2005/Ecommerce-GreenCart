import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {
    const {token} = req.cookies;

    if (!token) {
        return res.json({success: false, message: "Not Authorized"});
    }

    try {
        const toktnDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (toktnDecode.id) {
            req.body.userId = toktnDecode.id;
        } else {
            return res.json({success: false, message: "Not Authorized"})
        }
        next();
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export default authUser;