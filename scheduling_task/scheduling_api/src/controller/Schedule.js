const service = require('../service/Schedule')
const scheduleTask = async (req, res) => {
    try {
      const data = await service.scheduleTask(req);
      if(data.status === 201){
        res.status(data.status)
        .json({ message:"Schedule Task Created", data: data.data });
      }else{
        res.status(409).json({ message: data.error });

      }
     
      
    } catch (error) {
      res.status(409).json({ message: error.message });
      
    }
  };
  
  module.exports = {
    scheduleTask,
  };
  