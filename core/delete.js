const fs = require('fs')


module.exports = app => {


    function deleteimg(filepath){

        const path = filepath

        try {
            fs.unlinkSync(path)
            return callback(null)
        } catch(err) {
            return callback("NON EXISTE")
        }

    }

    return { deleteimg }
}
