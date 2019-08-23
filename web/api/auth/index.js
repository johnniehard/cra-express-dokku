
export const requireAuth = (req, res, next) => {
    if (req.authenticated) {
        return next()
    }

    res.status(401)
    res.json({ error: 'login required' })
}