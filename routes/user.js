

const express = require("express")
const router = express.Router()
const userController = require("../controllers/UserController");
const upload = require('../middleware/storage-user');

const AuthController  = require('../routes/authentification')

router.post("/changeprofile/pic/:id", AuthController.ChangeProfilePic);




/**
 * @swagger
 * /api/user/register:
 *  post:
 *      description: see users
 *      responses:
 *          200:
 *              description: 
 *                  new user created!
 */
router.post('/register', AuthController.register)



router.post('/login',AuthController.login)



/**
 * @swagger
 * /api/user/show:
 *  post:
 *      description: see users
 *      parameters:
 *       - in: formData
 *         _id: _id
 *         type: string
 *      responses:
 *          200:
 *              description: 
 *                  new user created!
 */
router.route("/show").post(AuthController.show);
//router.route('/show',AuthController.show)
router.post("/reEnvoyerConfirmationEmail", AuthController.reEnvoyerConfirmationEmail);
router.get("/confirmation/:token", AuthController.confirmation);



// Getting All
/**
 * @swagger
 * /api/user/showall:
 *  get:
 *      responses:
 *          200:
 *              description: 
 *                  new user created!
 */
router.get("/showall", AuthController.showall);
router.post("/motDePasseOublie", AuthController.motDePasseOublie);
router.put("/changerMotDePasse", AuthController.changerMotDePasse);


/**
 * @swagger
 * /api/user/updateProfile:
 *  post:
 *      description: see users
 *      responses:
 *          200:
 *              description: 
 *                  new user created!
 */
router.put("/updateProfile", AuthController.updateProfile);
router.post("/RegisterWithGoogle", AuthController.RegisterWithGoogle);

module.exports = router




// const express = require("express")
// const router  = express.Router()

// const UserController = require('../controllers/UserController');
// //description: see users
// // Getting All
// /**
//  * @swagger
//  * /api/user/showall:
//  *  get:
//  *      responses:
//  *          200:
//  *              description: 
//  *                  new user created!
//  */

//  router.get('/showall',UserController.showall);



// router.get('/',UserController.index);


// /**
//  * @swagger
//  * /api/user/show:
//  *  post:
//  *      description: see users
//  *      responses:
//  *          200:
//  *              description: 
//  *                  new user created!
//  */
// router.post('/show',UserController.show);
// /**
//  * @swagger
//  * /api/user/:
//  *  get:
//  *      description: see users
//  *      responses:
//  *          200:
//  *              description: 
//  *                  new user created!
//  */

// router.get('/',UserController.index);
// //   parameters: [],
// /**
//  * @swagger
//  * /api/user/store:
//  *  post:
//  *      description: see users
//  *      responses:
//  *          200:
//  *              description: 
//  *                  new user created!
//  */
// router.post('/store',UserController.store);
// /**
//  * @swagger
//  * /api/user/update:
//  *  post:
//  *      description: see users
//  *      responses:
//  *          200:
//  *              description: 
//  *                  new user created!
//  */
// router.post('/update',UserController.update);
// /**
//  * @swagger
//  * /api/user/delete:
//  *  post:
//  *      description: see users
//  *      responses:
//  *          200:
//  *              description: 
//  *                  new user created!
//  */
// router.post('/delete',UserController.destory);

// router.route("/one")
// .post(userController.add);
// //.post(upload.single('picture'), userController.add);
// //.post(upload.fields([{ name: "picture", maxCount: 1, }]), userController.add)
// router.route("/all").get(userController.getAll);

// router.route("/show").post(userController.show);

// router.route("/store").post(userController.store);

// // router.route("/conf").get(userController.confirmation);

// router.route('/get/:_id').get(userController.get)
//router.post('/one', upload.fields([{ name: "picture", maxCount: 1, }]), userController.add)