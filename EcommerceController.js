const mongoose = require('mongoose');
require('dotenv').config();
const apiModel = require('../Models/EcommerceModel');
const  cloudinary = require('../Controller/Cloudinary/config');
const dbConnect = require('../dbConnect/connectDB');
const multer = require('multer');

dbConnect();

// ...
      // ============ MULTER START ======

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp');
  },
  filetitle: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originaltitle + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });
 
      // ============ MULTER END ======

const EcommerceController = {
    addData: async (req, res) => {
      try {     
        const { title, description, condition, price, phone, imageUrl, location } = req.body;
    
        if (!imageUrl) {
          return res.status(400).send({ message: 'No image URL received' });
        }
    
        // Add uploadedAt field with current date-time
        const uploadedAt = new Date(); // Current date-time
        const newProduct = new apiModel({
          title,
          description,
          condition,
          price,
          phone,
          imageUrl,
          location,
          uploadedAt // Save current date-time while uploading ad
        });
    
        const response = await newProduct.save();
        return res.status(201).send({ message: 'Data posted successfully', data: response });
            
      } catch (err) {
        return res.status(500).send({ message: 'Server error', error: err.message });
      }
    },

  getData: async (req, res) => {
      try {
          const getProducts = await apiModel.find();
          return res.send(getProducts);
      } catch (err) {
          return res.status(500).send({ message: "server error", error: err.message });
      }
  },
  
  getDataById: async (req, res) => {
      try {
          const { id } = req.params;
          const getById = await apiModel.findById(id);
          const isValidId = mongoose.Types.ObjectId.isValid(id);
          if (!isValidId) {
              return res.status(400).send({ message: "Invalid ID" });
          }
          if (!getById) {
              res.status(404).send({ message: "invalid id data not found" });
          }
          return res.status(200).send(getById);
      } catch (err) {
          return res.status(500).send({ message: "server error", error: err.message });
      }
  },
  
  putData: async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, condition, price, phone, location, imageUrl } = req.body;
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        
        if (!isValidId) {
            return res.status(400).send({ message: "Invalid ID" });
        }

        const putData = await apiModel.findByIdAndUpdate(
            id,
            { title, description, price, condition, phone, location, imageUrl },
            { new: true }
        );

        if (!putData) {
            return res.status(404).send({ message: "Data not found" });
        }

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            putData.imageUrl = result.secure_url; // Update imageUrl field

            // Save the updated putData with new imageUrl
            const updatedData = await putData.save();

            return res.status(200).send(updatedData); // Respond with updated data
        }

        return res.status(200).send(putData); // Respond with data if no image was uploaded
    } catch (err) {
        res.status(500).send({ message: "Server error", error: err.message });
    }
},

  deleteData: async (req, res) => {
      try {
          const { id } = req.params;
          const { title, description, condition, price, phone, location } = req.body;
          const isValidId = mongoose.Types.ObjectId.isValid(id);
          if (!isValidId) {
              return res.status(400).send({ message: "Invalid ID" });
          }
          const deleteData = await apiModel.findByIdAndDelete(
              id,
              { title, description, price, condition, phone, location }
          )
          if (!deleteData) {
              return  res.status(404).send({ message: "data not found" });
          }
          return  res.status(200).send(deleteData);
      } catch (err) {
         return res.status(500).send({ message: "server error", error: err.message });
      }
  },
};

module.exports = {EcommerceController, upload};
