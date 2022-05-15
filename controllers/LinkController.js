const bodyParser = require('body-parser');
const Link = require('../models/Link');


const add = async (req, res) => {
    const { title, url, _id } = req.body

    let link =  new Link()
    link.title=title
    link.url= url
    link.user=_id
    await link.save()
    return res.status(200).send({ message: "Link added successfully", link });
  
  }



  const getLinksByUserId = async (req, res) => {
    const _id = req.body._id;
    console.log("req", req.body);
    const links = await Link.find({ user: _id }).sort({
      createdAt: -1,
    });
    var linksToSend = [];
    if (links.length == 0) {
      res.status(404).send({ links });
    } else {
      links.forEach((link) => {
        if (link.source != "source") linksToSend.push(link);
      });
  
      res.status(200).send({ links: linksToSend });
    }
  }




  
module.exports={
add,getLinksByUserId

}