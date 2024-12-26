const service = require('../service/User')
const registerUser = async (req, res) => {
    try {
      const data = await service.registerUser(req);
      if(data.status === 201){
        res.status(data.status)
        .json({ message:"User registered successfully", data: data.data });
      }else{
        res.status(409).json({ message: data.error });

      }
     
      
    } catch (error) {
      res.status(409).json({ message: error.message });
      
    }
  };
  const getAllUser = async (req, res) => {
    try {
       const data = await service.getAllUser(req);
      if(data.status === 200){
        res.status(data.status)
        .json({ message:"All User Fetch successfully", data: data.data });
      }else{
        res.status(409).json({ message: data.error });

      }
     
      
    } catch (error) {
      res.status(409).json({ message: error.message });
      
    }
  };
  const getOneUser = async (req, res) => {
    try {
      const data = await service.getOneUser(req);
      if(data.status === 200){
        res.status(data.status)
        .json({ message:" User Fetch successfully", data: data.data });
      }else{
        res.status(409).json({ message: data.error });

      }
     
      
    } catch (error) {
      res.status(409).json({ message: error.message });
      
    }
  };
  module.exports = {
    registerUser,
    getAllUser,
    getOneUser
  };
  