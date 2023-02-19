const {
    Surfer,
    Brand
  } = require('../models');

  const {
    getUserByEmail,
    createUser,
    updateUser
} = require('./user')
  
  const {
    Op
  } = require('sequelize');
  
  const emailValidator = require('email-validator');

  const controller = {
    home: async function (req, res) {
      try {
        const data = await Surfer.findAll();
        res.render('home', {
          surfers: data,
        });
      } catch (err) {
        console.log(err);
      }
    },
    surfer: async function (req, res) {
      try {
  
        const id = req.params.id;
        const surfer = await Surfer.findByPk(id, {
          include: ['brand', 'categories'],
        });
        res.render('surfer', {
          surfer: surfer,
        });
      } catch (err) {
        console.log(err);
      }
    },
  
    // controller pour la page 'brands' qui va afficher toutes les brands de la db
    brands: async function (req, res) {
      // bloc try/catch pour la gestion d'erreurs
      try {
        // on récupère via un findAll toutes les données de la table Brand
        const brands = await Brand.findAll({
          // on spécifie que 'lon souhaite récupérer uniquement la colonne 'name'
          attributes: ['name']
        })
        // on render la page 'brands' en lui passant le tableau obtenu de la db
        res.render('brands', {
          brands
        })
      } catch (error) {
        console.log(error)
      }
    },
  
    //controller pour la page 'brand' qui va nous afficher le nom d'une brand et tous les produits associés
    // url : localhost:3030/brand/Universal
    brand: async function (req, res) {
      try {
        // on récupère d'abord le nom dans les paramètres d'url
        const brandName = req.params.name;
        // puis on recherche via un findOne le Brand qui a ce name
        const brand = await Brand.findOne({
          where: {
            name: brandName
          },
          // on inclue les produits associès à cette brand
          include: 'surfers'
        })
        console.log(JSON.stringify(brand, null, 2));
        // on retourne la view dynamisée avec la donnée obtenue de la db
        res.render('brand', {
          brand
        })
      } catch (err) {
        console.log(err);
      }
    },
  
    search: async function (req, res) {
      // ici on vérifie que si l'utilisateur n'a pas encore fait de recherche (donc pas de query title dans l'url) on ne tente pas d'aller chercher des données, juste on affiche la page avec la barre de recherche et la variable 'results' avec une valeur null
      if (!req.query.title) {
        return res.render('search', {
          results: null
        })
      }
      // on récupère le nom que l'utilisateur a rentré dans la barre de recherche
      const queryName = req.query.title.trim();
  
      const results = await Surfer.findAll({
        // on va rechercher un produit dont le nom correspond a peu près à ce qui a été tapé par l'utilisateur
        where: {
          // notre/nos produit/s vont devoir respecter la condition suivante :
          title: {
            // ici on a 2 conditions sur la même ligne
            // 1 -> avec l'opérateur iLike la recherche sera insensible à la casse
            // 2 -> le nom devra commencer par le queryName renseigné par l'utilisateur (équivalent d'un string% / [Op.startsWith])
            [Op.iLike]: queryName + '%',
          }
        }
      })
  
      console.log(JSON.stringify(results, null, 2));
  
  
      res.render('search', {
        results
      })
    },

    signupPage(req, res) {
      res.render('signup')
      console.log(req.body)
  },

  async signup(req, res) {
      // on récupère les données formulaires depuis le req.body
  
      const {
          name,
          email,
          password,
          passwordConfirm
      } = req.body;

      // on vérifie qu'aucune donnée ne manque
      if (!name || !email || !password) {
          return res.render('signup', {
              error: 'Tous les champs doivent être renseignés'
          })
      }
    
      // on vérifie que l'adresse email est valide via le package email-validator
      if (!emailValidator.validate("test@email.com")) {
          return res.render('signup', {
              error: 'Veuillez rentrer un email valide'
          })
      }

      // et je construis un nouvel utilisateur en lui passant le hash et pa sle password pour enregistrer dans la db
      const newUser = {
          name: name,
          email: email,
          password: password
      }
      // on met dans un bloc try catch pour gérer si sequelize nous renvoie une erreur lors du create (par exemple si l'email est déjà utilisé)
      try {
          // on appelle notre fonction de creation d'utilisateur et on récupère l'utilisateur créé
          
          const user = await createUser(newUser);
          console.log(user)
          // on renvoie la page login si l'utilisateur a bien créé son compte en ajoutant un message pour le feedback
          
          res.render('login', {
              message: `Compte créé avec succès, veuillez vous connecter ${user.name}`
          })
      } catch (err) {
          // si la moindre erreur survient on renvoie la page signup avec le message d'erreur
          
          return res.render('signup', {
              err
          })
      }
  },
  
  };
  
  module.exports = controller;