const isAuthenticated = (req, res, next) => {
    if (req.session.user !== undefined) {
        // console.log("user exists")
        next()
    } else {
        return res.status(401).redirect('/account/login')
    }
}

export default isAuthenticated