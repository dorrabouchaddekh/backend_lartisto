
const User   = require('../models/User')
const bcrypt  =require('bcryptjs')
const keys = require("../keys");
const jwt    =require('jsonwebtoken')
const nodemailer = require('nodemailer');
const Role = require('../middleware/role');

//=======================================================
const multer = require("multer");
//const upload = multer({ dest: "../uploads/" });
const fs = require("fs");
const Link = require('../models/Link');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req files", file);

    const userID = req.params.id;
    const dir = `./uploads/users/user-${userID}/profil-pic/`;
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      return cb(null, dir);
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  //limits: { fileSize: maxsize },
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    var filetypes = filetype;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype) {
      return cb(null, true);
    }
    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    );
  },
});

var upload = multer({ storage: storage }).any();



const showall= (req,res,next)=> {
    let userID=req.body.userID
    User.find({})
    .then((response) => {
        res.json(
            response
        )
    })
    .catch(error=>{
        res.json({
            message:'An error Has Occured!'

        })
    })
}
//======================================================






const ChangeProfilePic = async (req, res) => {
  console.log("upload image body", req.body);
  const id = req.params.id;

  upload(req, res, async function (err) {
    if (err) {
      res.send({ err });
    }

    console.log("req", id);
    console.log(req.files[0]["originalname"]);
    //console.log(res)
    const path = req.body.originalname + new Date();
    const Updateuser = await User.updateOne(
      { _id: id },
      {
        $set: {
          pictureId:
            "uploads/users/user-" +
            id +
            "/profil-pic/" +
            req.files[0]["originalname"],
        },
      }
    );

    const user = await User.findOne({ _id: id });
    //  console.log("user updated", user);
    res.status(200).send({ user });
  });
};
const register = async (req, res) => {

  
  const { firstname, lastname, email, password} = req.body


  

  console.log(
    req.body.firstname
)
console.log(
req.body.lastname
)
console.log(
req.body.email
)
console.log(
req.body.password
)
console.log(
    req.body.pictureId
    )
   
  const verifUtilisateur = await User.findOne({ email });
  if (verifUtilisateur) {
    res.status(403).send({ message: "Utilisateur existe deja !" });
  } else {
    const nouveauUtilisateur = new User();

    mdpEncrypted = await bcrypt.hash(password, 10);

    nouveauUtilisateur.firstname = firstname;
    nouveauUtilisateur.lastname = lastname;
    nouveauUtilisateur.email = email;
    nouveauUtilisateur.password = mdpEncrypted; 

    nouveauUtilisateur.isVerified = false;

    nouveauUtilisateur.save();
    SetupUserFolder(nouveauUtilisateur._id);

    
    // token creation
    const token = jwt.sign({ _id: nouveauUtilisateur._id, role: Role.Utilisateur }, keys.jwtkey, {
      expiresIn: "120000", // in Milliseconds (3600000 = 1 hour)
    });

    sendConfirmationEmail(email, token);
    res.status(201).send({ message: "success", uses: nouveauUtilisateur, "Token": jwt.verify(token, keys.jwtkey) });
  }
};


  const reEnvoyerConfirmationEmail = async (req, res) => {
    const utilisateur = await User.findOne({ "email": req.body.email });
  
    if (utilisateur) {
      // token creation
      const token = jwt.sign({ _id: utilisateur._id, email: utilisateur.email, role: Role.Utilisateur }, keys.jwtkey, {
        expiresIn: "60000", // in Milliseconds (3600000 = 1 hour)
      });
  
      sendConfirmationEmail(req.body.email, token);
  
      res.status(200).send({ "message": "L\'email de confirmation a été envoyé a " + utilisateur.email })
    } else {
      res.status(404).send({ message: "Utilisateur innexistant" })
    }
  };  

  async function sendConfirmationEmail(Email, token) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testrapide45@gmail.com',
        pass: 'biglou009'
      }
    });
  
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        console.log("Server not ready");
      } else {
        console.log("Server is ready to take our messages");
      }
    });
  
  
    const urlDeConfirmation = "http://localhost:8000/api/user/confirmation/"+ token;
  
  
    const mailOptions = {
        from: 'Malla-Fann<testrapide45@gmail.com>',
      to: Email,
      text: 'For clients with plaintext support only',
      subject: 'ADMIN ACCOUNT ',
      html: "<h3>Veuillez confirmer votre email en cliquant sur ce lien : </h3><a href='" + urlDeConfirmation + "'>Confirmation</a>"
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
}
const confirmation = async (req, res) => {

  var tokenValue;
  try {
    tokenValue = jwt.verify(req.params.token, keys.jwtkey);
  } catch (e) {
    return res.status(400).send({ message: 'Le lien verification a peut être expireé, Veuillez revérifier votre email.' });
  }

  User.findById(tokenValue._id, function (err, use) {
    if (!use) {
      return res.status(401).send({ message: 'Aucun utilisateur, Veuillez proceder a l\'inscription.' });
    }
    else if (use.isVerified) {
      return res.status(200).send({ message: 'Cet utilisateur a deja été verifié, Veuillez vous connecter' });
    }
    else {
      use.isVerified = true;
      use.save(function (err) {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        else {
          return res.status(200).send({ message: 'Votre compte a été verifié' });
        }
      });
    }
  });
}

const login = async (req, res) => {
  console.log("body");
  console.log(
    req.body.email
    )
    console.log(
    req.body.password
    )
  const { email, password } = req.body;

  const use = await User.findOne({ email });

  if (use && (await bcrypt.compare(password, use.password))) {
    const token = jwt.sign({ id: use._id, email }, keys.jwtkey, {
      expiresIn: "360000",
    });

    if (!use.isVerified) {
      res.status(200).send({ use, message: "email non verifié" });
    } else {
      res.status(200).send({ token, use, message: "success" });
    }

  } else {
    res.status(403).send({ message: "mot de passe ou email incorrect" });
  };
}

const show = (req, res, next) => {
        
         User.findById(req.body._id)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.status(404).send({ message: "probleme" })
        })
        console.log(
            req.body._id
        )
    };
    
   
    async function SetupUserFolder(id) {
      const dir =  `./uploads/users/user-${id}`;
      //lkmlklm
      fs.mkdir(dir, function () {
        fs.exists(dir, function (exist, err) {
          if (exist) {
            const dir2 =  `./uploads/developers/developer-${id}/profile-pic`;
            fs.mkdir(dir2, function () {
              console.log("folder created");
            });
          }
        });
      });
    }

    
const motDePasseOublie = async (req, res) => {
  const codeDeReinit = req.body.codeDeReinit
  console.log(codeDeReinit)
  const use = await User.findOne({ "email": req.body.email });

  if (use) {
    // token creation
    const token = jwt.sign({ _id: use._id, email: use.email }, keys.jwtkey, {
      expiresIn: "3600000", // in Milliseconds (3600000 = 1 hour)
    });

    envoyerEmailReinitialisation(req.body.email, token, codeDeReinit);

    res.status(200).send({ "message": "L'email de reinitialisation a été envoyé a " + use.email })
  } else {
    res.status(404).send({ "message": "Utilisateur innexistant" })
  }
};

async function envoyerEmailReinitialisation(email, token, codeDeReinit) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testrapide45@gmail.com',
      pass: 'biglou009'
    }
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
      console.log("Server not ready");
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const mailOptions = {
    from: 'Malla-Fann<testrapide45@gmail.com>',
    to: email,
    subject: 'Reinitialisation de votre mot de passe - Malla-Fann',
    html: "<h3>Vous avez envoyé une requete de reinitialisation de mot de passe </h3><p>Entrez ce code dans l'application pour proceder : <b style='color : blue'>" + codeDeReinit + "</b></p>"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent : ' + info.response);
    }
  });
}


const changerMotDePasse = async (req, res) => {
  const { email, nouveauMotDePasse } = req.body;

  nouveauMdpEncrypted = await bcrypt.hash(nouveauMotDePasse, 10);

  let use = await User.findOneAndUpdate(
    { email: email },
    {
      $set: {
        password : nouveauMdpEncrypted
      }
    }
  );

  res.send({ use });
};

    

const updateProfile = async (req, res) => {
  const {_id , firstname, lastname} = req.body

  let user = await User.updateOne(
    { _id: _id },
    {
      $set: {
        firstname,
        lastname
      },
    }
  )

  return res.send({ message: "Profile updated successfully", user })
};





    
module.exports ={
register,login,reEnvoyerConfirmationEmail,confirmation,show,showall,ChangeProfilePic,motDePasseOublie,changerMotDePasse,updateProfile
}




// const router = require('express').Router();
// let User = require('../models/User');
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");
// function generateUserToken(user) {
//     return jwt.sign({ user }, process.env.JWT_SECRET, {
//       expiresIn: "100000000", // in Milliseconds (3600000 = 1 hour)
//     })
//   }

// router.route('/register').post(async (req, res) => {

//     try {

//         let {
//             nom,
//             prenom,
//            // photo,
//             email,
//             password
//         } = req.body;

       
//             User.find({email}).then(result => {
//                 if(result.length){
//                     // A user already exists
                    
//                     res.status(400).json({
//                         status: "FAILED",
//                         message:"User with the provided mail already exists"
//                     })
//                 }else{
//                     //try to create new user

//                     //password handling
//                     const saltRounds = 10
//                     bcrypt.hash(password, saltRounds).then(hashedPassword => {
//                         const newUser = new User({
//                             nom,
//                             prenom,
//                            // photo,
//                             email,
//                             password: hashedPassword
                            
//                         })
//                         newUser.save().then(result => {
//                             res.json(
//                                 result
//                             ) 
//                         }).catch(err =>{
//                             res.status(400).json(err)
//                         })
//                     }).catch(err => {
//                         res.json({
//                             status: "FAILED",
//                             message: "An error occured while hashing password"
//                         })
//                     })
//                 }
//             }).catch(err => {
//                console.log(err) 
//                res.json({
//                    status: "FAILED",
//                    message: "An error occured while checking for existing user"
//                })
//             })
//         //}
         

//     } catch (err) {
//         console.error(err);
//         res.status(500).send();
//     }

// });
// // router.route('/login').post(async(req,res) => {
// //     const{email,password} =req.body

// //     const user = await User.findOne({email})
    
// //     if(user && (await user.matchPassword(password))){
// //         res.status(200).json(user)
// //     }else{
// //         res.status(401).json({message : "password or email"})

// // } 
// // })   

// router.route('/login').post(async (req, res) => {
//     try {

//         const email = req.body.email;
//         const passwordEntered = req.body.password;

//         console.log(email)
//         console.log(passwordEntered)

//         // validate

//         if (!email || !passwordEntered){
            
//             return res
//                 .status(400)
//                 .json({
//                     errorMessage: "Please enter all required fields."
//                 });
//             }
//         const existingUser = await User.findOne({
//             email
//         }).select("+passwordEntered");
//         if (!existingUser)
//             return res.status(401).json({
//                 errorMessage: "Wrong email or password."
//             });

//         const passwordCorrect = await bcrypt.compare(
//             passwor dEntered,
//             existingUser.passwordCorrect

//         );
//         console.log(passwordCorrect)
//         if (!passwordCorrect) {
//             return res.status(401).json({
//                 errorMessage: "Wrong email or password."
//             });
//         }

//         require('dotenv').config();

  
//         //send the token in a HTTP-only cookie
//         const token = generateUserToken(User)
        
//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: true,
//             sameSite: "none",
//         }).json( _id, existingUser ).send();
        
//        res.status(201).json(existingUser)

//     } catch (err) {
//         console.error(err);
//         res.status(500).send();
//     }
// });

// /**
//  * @swagger
//  * /authentification/logout:
//  * get:
//  *  description: Use to request all publications
//  *  response:
//  *      '200':
//  *          description: A successful response
//  *
//  */
// router.route('/logout').get(auth, (req, res) => {
//     //console.log("logging out");
//     res
//         .cookie("token", "", {
//             httpOnly: true,
//             expires: new Date(0),
//             secure: true,
//             sameSite: "none",
//         })
//         .send();
//     // console.log(req.cookies + " :: user logged out");

// });

// router.route('/loggedIn').get((req,res) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) return res.json(false);

//         jwt.verify(token, process.env.JWT_SECRET);

//         res.send(true);
//     } catch (err) {
//         res.json(false);
//     }
// });

// // router.route('/log').post (async (req, res) => {
// //     const salt = await bcrypt.genSaltSync(10);
// //     const { email, password } = req.body;
  
// //     const user = await User.findOne({ email });
  
// //     if (user && (await bcrypt.compare(password, user.password))) {
// //       const token = generateUserToken(user)
  
// //       if (!user.isVerified) {
// //         res.status(403).send({ user, message: "email non verifié" });
// //       } else {
// //         res.status(200).send({ token, user, message: "success" });
// //       }
// //     } else {
// //       res.status(403).send({ message: "mot de passe ou email incorrect" });
// //     }
// //   });

//