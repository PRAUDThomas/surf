const {
    User
} = require('../models')




// méthode + efficace avec FindOne
async function getUserByEmail(useremail) {
    // on recherche un utilisateur via l'email passé en paramètre de la fonction
    const user = await User.findOne({
        // clause where sur la colonne email
        where: {
            email: useremail
        }
    })
    // ici on s'attend à obtenir un user qui sera soit une instance de User si il a été trouvé, soit null
    return user;
}


async function createUser(newUser) {
    try {
        const user = await User.create(newUser);
        console.log(user)
        return user;
   
    } catch (err) {
        return err;
    }
}

// notre fonction reçoit 2 arguments : l'id du user qu'on souhaite modifier et les infos à modifier
async function updateUser(id, newUser) {
    try {
        // on recherche d'abord l'utilisateur à modifier via son id
        const user = await User.findByPk(id);

        // sinon on appelle la méthode d'instance update() en lui passant l'objet qui contient toutes les informations à modifier

        // !! Dans notre newUser on a une propriété 'oldpassword' qui n'existe pas sur notre model User, sequelize va donc simplement l'ignorer et modifier uniquement les propriétés qui existent sur le model
        user.update(newUser)
        // et on retourne l'utilisateur modifié
        return user
    } catch (err) {
        console.log(err);
        return err
    }
}

module.exports = {
    getUserByEmail,
    createUser,
    updateUser
}