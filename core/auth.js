const authSecret = process.env.AUTHSECRET
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => 
{

    /*  Metodo responsavel por login onde é retornado e definido 
    *   um token de usuario
    */
    const signin = async (req, res) => {
        //Caso não for informado o email e senha
        if (!req.body.email || !req.body.senha) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const cliente = await app.db('cliente')
            .where({ email: req.body.email })
            .first()

        //Verifica se o email está cadastrado
        if(!cliente) return res.status(400).send('Email não cadastrado!')

        //Verifica se a senha fornecido pelo usuario se identifica com o usuario cadastrado
        const isMatch = bcrypt.compareSync(req.body.senha, cliente.senha)
        if (!isMatch) return res.status(401).send('Senha inválida!')


        criaSession(req, cliente)
        req.session.carrinho = []

		res.redirect('/')
    }

    //Ele valida a consistencia do token JWT
    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {
            // problema com o token
        }

        res.send(false)
    }

    /*Verifica se a sessão existe*/
	const validateSession = async (req, res, next) => {
		session = req.session;
		if(session.cliente){
			next()
		}
		else{
			return res.redirect('/Cliente/Login')
		}
	}

    /*Verifica se o usuário é admin*/
    const validateAdmin = async (req, res, next) => {
        session = req.session;
        if (!session.cliente){
            return res.redirect('/Cliente/Login')
        }
        if(session.cliente.tipo == 'ADMIN'){
            next()
        }
        else{
            return res.redirect('/')
        }
    }

    function criaSession(req, cliente){
       //Tempo atual
        const now = Math.floor(Date.now() / 1000)

        //Definindo payload do JWT
        const payload = {
            cliente:{
                id:     cliente.id,
                nome:   cliente.nome,
                email:  cliente.email,
                tipo:   cliente.tipo,
                imagem: cliente.imagem,
            },
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        //Rest operator pegua os argumentos e adiciona, apos ele gera um token JWT
        var token = jwt.encode(payload, authSecret)
        var session = req.session;
        
        session.cliente = jwt.decode(token, authSecret).cliente
    }

    const logout = async (req, res, next) => {
            req.session.destroy()
            return res.redirect('/Cliente/Login')
    }
    return { signin, logout, validateSession, validateAdmin, criaSession }
}