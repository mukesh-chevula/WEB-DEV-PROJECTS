import express from 'express'
import Enquiry from '../Models/EnquirySchema.js'
const router = express.Router()

router.post('/enquiry', (req, res) => {
    const { name, email, phone, program } = req.body;
  
    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
      program,
    });
    try {
        newEnquiry
          .save()
          .then((enquiry) => res.json(enquiry))
          .catch((err) => console.log(err));
        
    } catch (error) {
        res.status(400).json("Error")
    }
  });
  
  export default router;
