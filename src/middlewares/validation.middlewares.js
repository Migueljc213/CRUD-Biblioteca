const validate = (schema) => (req, res, next) => {
    try {
        //esse parse verifica se os dados passados da req, são compativeis aos dados do schema passado
        schema.parse(req.body);
        next()
    } catch (err) {
        res.status(400).json({ error: err.errors })
    }

}

export { validate };