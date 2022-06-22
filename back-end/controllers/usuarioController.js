import Usuario from "../models/Usuario.js";

const registrar = async (req, res) => {
    //evitar registros duplicados.
    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({email});

    if (existeUsuario) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }


    try {
        const usuario = new Usuario(req.body);
        const usuarioAlmacenado = await usuario.save();
        res.json({msg: "Creando usuario"});

    } catch (error) {
       console.log(error);
    }
}

export { registrar };