const fs = require('fs')

module.exports = app => {

	const toIndex = async(req, res) => {
		if(!req.session.sessions){
			req.session.sessions = []
		}
		return res.render('./index.ejs')
	}

	const toGrid = async(req, res) => {
		if(!req.session.sessions){
			req.session.sessions = []
		}

		const imgs = fs.readdirSync('./public/images/uploads/')
		const grids = fs.readdirSync('./public/images/grids/')
		return res.render('./gridMenu.ejs', { imgs , grids })
	}

	const newGrid = async(req, res) => {
		if(!req.session.sessions){
			req.session.sessions = []
		}

		return res.render('./gridNew.ejs')
	}
	const paint = async(req, res,) => {
		if(!req.session.sessions){
			req.session.sessions = []
		}

		return res.render('./gridPaint.ejs', { paint })
	}
	const pushImgs = async(req, res) => {
		if(!req.session.sessions){
			req.session.sessions = []
		}

		const imgs = fs.readdirSync('./public/images/uploads/')

		return res.json({ imgs })
	}

	return {toIndex,toGrid,newGrid,paint,pushImgs}

}
