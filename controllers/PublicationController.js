const Publication = require('../models/Publication')
const multer = require('multer');
const router = require('../routes/authentification');
const bodyParser = require('body-parser');





const index=(req, res, next) => 
{
    Publication.find()
    .then(reponse =>{
        res.json({
        response
         })
    })
 .catch(error=>{
     res.json({
        error
    })
 })   
}

const show = (req, res, next) => {
    let publicationID = req.body.publicationID
    Publication.findById(publicationID)
    .then(reponse => {
        res.json({
            reponse
        })
    })
    .catch(error => {
        res.json({
            message:'an error Occured'
        })
    })
}


const store =  (req, res, next) => {
    console.log(req.file);

    let publication= new Publication({
        title: req.body.title,
        description: req.body.description,
        photo: req.body.photo,
        nbrPhotos: req.body.nbrPhotos,
        video: req.body.video,
        audio: req.body.audio,
        enchere: req.body.enchere
    })
    publication.save()
    .then(response => {
        res.json({
            message:'pub Added Sucessfull!'
        })
    })
.catch(eroor => {
    res.json({
        message:'an error Occured!'
    })
})
}


//update an utilisateur
const update =(req, res, next)=>
{
    let publicationID=req.body.publicationID
    let updateData={
        title:req.body.title,
        description:req.body.description,
        nbrPhotos:req.body.nbrPhotos,
        video:req.body.video,
        audio:req.body.audio,
        enchere:req.body.enchere
    }
    User.findByIdAndUpdate(publicationID, {$set:updateData})
    .then(()=>{
        res.json( {
            message:'User updated successfully!'
        })
    })
.catch(error =>{
    res.json({
        message:'an error Occured!'
    })
})
}


//delete an utilisateur

const destory=(req,res,next) =>{
    let publicationID= req.body.publicationID
    Publication.findByIdAndRemove(publicationID)
    .then(()=>{
        req.json({
            message: 'an error Occured!'
        })
    })
    .catch(error =>{
        res.json({
            message:'an error Occured!'
        })
    })
}

const searchUser = async (req, res) => {
    const text = req.body.text;
    if (text != "") {
      var publications = await Publication.find({
        title: { $regex: text, $options: "i" },
      }).exec();
      if (publications != undefined) {
        console.log(publications)
        res.status(200).send({ publications });
      } else {
        res.status(500);
      }
    } else res.status(403);
  };

  

/*const img = ( upload.single('photo') ,(req, res, next) => {
    console.log(req.file);

    const publication= new Publication({
        title: req.body.title,
        description: req.body.description,
        photo: req.body.photo,
        nbrPhotos: req.body.nbrPhotos,
        video: req.body.video,
        audio: req.body.audio,
        enchere: req.body.enchere
    })
    publication.save()
    .then(result => {
        console.log(result);
        res.json({
            
            message:'pub Added Sucessfull!',
            createdPub:{
            title: result.title
        }
        })
    })
.catch(eroor => {
    res.json({
        message:'an error Occured!'
    })
})
})
*/


const add = async (req, res) => {
    const { title, description, _id } = req.body

    var pictureId;
    //    console.log(req.files[0]["originalname"]);
    if (req.file) {
        console.log(req.file.path)
      pictureId = req.file.path
    }
    
    let post =  new Publication({
      title,
      description,
      pictureId,
      _id,
    })
    await post.save()
    return res.status(200).send({ message: "Post added successfully", post });
  
  }



  const addPub = async (req, res) => {

        await Publication.findOneAndUpdate({_id:req.body.pubId},{
          $set: {
            description:req.body.description,
            user:req.body._id
          }
        });
        return res.send({ message: "User updated successfully" });
      
    };


    const getAll = async (req, res) => {
        res.send({ posts: await Publication.find() });
    };

    const getMy = async (req, res) => {
        res.send({ posts: await Publication.find({ user: req.body.user }) })
      }


      const showFirstFive = (req, res, next) => {
        Publication.find()
        .then(reponse => {
            res.json(
                reponse.slice(-5)
            )
        })
        .catch(error => {
            res.json({
                message:'an error Occured'
            })
        })
    }




      const GetVideoByUser = async (req, res) => {
        const _id = req.body._id;
        console.log("req", req.body);
        const posts = await Publication.find({ user: _id }).sort({
          createdAt: -1,
        });
        var publicationToSend = [];
        if (posts.length == 0) {
          res.status(404).send({ posts });
        } else {
          posts.forEach((publication) => {
            if (publication.source != "source") publicationToSend.push(publication);
          });
      
          res.status(200).send({ posts: publicationToSend });
        }
      };




      


module.exports={
    index,show,store,update,destory,searchUser,add,addPub,getAll,getMy,GetVideoByUser,showFirstFive

}