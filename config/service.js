

module.exports = app => {

    const sendToPage = (req, res, name) => {
        res.render(name)
    }
	
	return { sendToPage }
}
