module.exports = app =>{
	const controller = app.controller;
	const auth = app.core.auth;
	const uploadImg = app.core.upload.uploadImg.single('file')
	const fs = require('fs')

	app.route('/')
		.get(controller.sessions.toIndex)
		.post(function(req, res){
			uploadImg(req, res, function(err){
				if (err){
					res.json({ req: "erro", filename: req.extensao})
				}
				else{
					res.json({ req: "ok", filename: req.pathFile})
				}
			})
		})

	app.route('/grid')
		.get(controller.sessions.toGrid)
	app.route('/newgrid')
		.get(controller.sessions.newGrid)
	app.route('/deleteImg')
		.post(function(req, res){
			const path = require('path');
			console.log(path )
			try {
				fs.unlinkSync(path)
				res.json({ req: "upload realizado com sucesso!"})
			} catch(err) {
				res.state(404).json({ req: "non deu certo, o " + req + " por algum motivo NON EXISTE"})
			}
		})
	app.route('/paint')
		.get(controller.sessions.paint)
	app.route('/paint/pushimgs')
		.get(controller.sessions.pushImgs)
}
