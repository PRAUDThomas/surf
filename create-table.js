require('dotenv').config();
// pour réaliser une création de table avec sequelize
// on part de notre objet connecté à la bdd
// un require va executer le code du module ciblé
const sequelize = require('./app/database');
// on définit déjà les modèles, sans ça impossible pour sequelize de les connaitre
const {
  Surfer,
  Brand,
  Category
} = require('./app/models');

const db = {
  create: async () => {
    try {
      await sequelize.drop();
      await sequelize.sync();
      // seulement après avoir crée les tables, je peux mettre des choses dedans
      db.seeding();
    } catch (error) {
      console.log(error);
    }
  },
  seeding: async () => {
    try {
      const MF = await Surfer.create({
        title: 'Mick Fanning',
        description: 'Athlete Americain',
      });
      const GM = await Surfer.create({
        title: 'Gabriel Medina',
        description: 'Athlete Bresilien',
      });
      const AL = await Surfer.create({
        title: 'Arthur Longo',
        description: 'Athlete Francais',
      });
      const OW = await Surfer.create({
        title: 'Owen Wright',
        description: 'Athlete Australien',
      });
      const rip_Curl = await Brand.create({
        name: 'Rip Curl',
      });
      const volcom = await Brand.create({
        name: 'Volcom',
      });
      const snowboarder = await Category.create({
        title: 'Snowboarder'
      })
      const surfer = await Category.create({
        title: 'Surfer'
      })
      MF.setBrand(rip_Curl);
      GM.setBrand(rip_Curl);
      AL.setBrand(volcom);
      OW.setBrand(rip_Curl)

      MF.addCategories(surfer);
      GM.addCategory(surfer);
      AL.addCategory(snowboarder);
      OW.addCategories(surfer);
    } catch (error) {
      console.log(error);
    }
  },
};

// on execute la fonction qui appelle sequelize.sync qui s'occupe de crée des tables à partir des modèles
db.create();