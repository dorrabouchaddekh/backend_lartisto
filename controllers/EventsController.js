const Event = require('../models/Events')
const multer = require('multer');
const router = require('../routes/authentification');
const bodyParser = require('body-parser');





const index=(req, res, next) => 
{
    Event.find()
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
    let eventID = req.body.eventID
    Event.findById(eventID)
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

    let event= new Event({
        title: req.body.title,
        name: req.body.name,
        photo: req.body.photo,
        nbrPhotos: req.body.nbrPhotos,
        video: req.body.video,
        audio: req.body.audio,
        enchere: req.body.enchere
    })
    event.save()
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
    let eventID=req.body.eventID
    let updateData={
        title:req.body.title,
        name:req.body.name,
        nbrPhotos:req.body.nbrPhotos,
        video:req.body.video,
        audio:req.body.audio,
        enchere:req.body.enchere
    }
    User.findByIdAndUpdate(eventID, {$set:updateData})
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
    let eventID= req.body.eventID
    Event.findByIdAndRemove(eventID)
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
      var events = await Event.find({
        title: { $regex: text, $options: "i" },
      }).exec();
      if (events != undefined) {
        console.log(events)
        res.status(200).send({ events });
      } else {
        res.status(500);
      }
    } else res.status(403);
  };

  

/*const img = ( upload.single('photo') ,(req, res, next) => {
    console.log(req.file);

    const event= new Event({
        title: req.body.title,
        name: req.body.name,
        photo: req.body.photo,
        nbrPhotos: req.body.nbrPhotos,
        video: req.body.video,
        audio: req.body.audio,
        enchere: req.body.enchere
    })
    event.save()
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


// const add = async (req, res) => {
//     var pictureId;
//     if (req.file) {
//         console.log(req.file.path)
//       pictureId = req.file.path
//     }
//     await Event.findOneAndUpdate({_id:req.body.eventId},{
//         $set: {
//       pictureId,
//       _id,
//         }
//     })
//     return res.send({ message: "User updated successfully" });
  
//   }





//   const addEvent = async (req, res) => {

//     const { name, date, longitude, latitude, _id } = req.body
//     let event =  new Event( {
//             name: req.body.name,
//             date: req.body.date,
//             longitude: req.body.longitude,
//             latitude: req.body.latitude,
//             user: req.body._id
          
//      } )
//      await event.save()
//         return res.send({ message: "User updated successfully" });
      
//     };






//=======================================
const add = async (req, res) => {
    const {  name, _id } = req.body

    var pictureId;
    //    console.log(req.files[0]["originalname"]);
    if (req.file) {
        console.log(req.file.path)
      pictureId = req.file.path
    }
    
    let event =  new Event({

      name,
      pictureId,
      _id,
    })
    await event.save()
    return res.status(200).send({ message: "Post added successfully", event });
  
  }



  const addEvent = async (req, res) => {

        await Event.findOneAndUpdate({_id:req.body.eventId},{
          $set: {
            name: req.body.name,
            date: req.body.date,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            user: req.body._id
          }
        });
        return res.send({ message: "User updated successfully" });
      
    };

    //===========================================










    const getAll = async (req, res) => {
        res.send({ events: await Event.find() });
    };

    const getMy = async (req, res) => {
        res.send({ events: await Event.find({ user: req.body.user }) })
      }


      const showFirstFive = (req, res, next) => {
        Event.find()
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
        const events = await Event.find({ user: _id }).sort({
          createdAt: -1,
        });
        var eventToSend = [];
        if (events.length == 0) {
          res.status(404).send({ events });
        } else {
          events.forEach((event) => {
            if (event.source != "source") eventToSend.push(event);
          });
      
          res.status(200).send({ events: eventToSend });
        }
      };




      


module.exports={
    index,show,store,update,destory,searchUser,add,addEvent,getAll,getMy,GetVideoByUser,showFirstFive

}