import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    program: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date,
         default: Date.now 
    }
  });
  
const Enquiry = mongoose.model('Enquiry', EnquirySchema);

export default Enquiry
  