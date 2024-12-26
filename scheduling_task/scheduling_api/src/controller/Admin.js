const service = require('../service/Admin')
const registerAdmin = async (req, res) => {
    try {
      const data = await service.registerAdmin(req);
      if(data.status === 201){
        res.status(data.status)
        .json({ message:"Admin registered successfully", data: data.data });
      }else{
        res.status(409).json({ message: data.error });

      }
     
      
    } catch (error) {
      res.status(409).json({ message: error.message });
      
    }
  };
  const loginAdmin = async (req, res) => {
    try {
      const data = await service.loginAdmin(req);
      if(data.status === 200){
        res.status(data.status)
        .json({ message:data.data.messages, data: data.data });
      }else{
        res.status(409).json({ message: data.error });

      }
     
      
    } catch (error) {
      res.status(409).json({ message: error.message });
      
    }
  };

  module.exports = {
    registerAdmin,
    loginAdmin
  };
  