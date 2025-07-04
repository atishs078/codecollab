const express = require('express');
const CodeSession = require('../model/CodeSession');
const verifyJWT = require('../middelware/verifyJWT');
const router = express.Router();
router.post('/save', verifyJWT,async (req, res) => {
    const {roomId, code} = req.body
    const userId = req.user.id
    try {
        const session = await CodeSession.findOneAndUpdate({roomId, userId},
            {code, updatedAt: new Date()},
            {new:true, upsert:true}
        )
        return res.status(200).json({
            message:"Code Saved Successfully",
            data: session
        })
        

    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error"})
    }

    
})
router.get("/load/:roomId", verifyJWT,async (req, res) => {
  const userId = req.user.id;
  const roomId = req.params.roomId;
  
  try {
    const session = await CodeSession.findOne({ userId, roomId });
    res.json({ success: true, code: session?.code || "" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
router.get('/my-rooms', verifyJWT, async (req, res) => {
  try {
    const rooms = await CodeSession.find({userId:req.user.id})
    .sort({updatedAt:-1})
    .select('roomId updatedAt language')
    .lean()
    const uniqueRooms = Array.from(new Map(rooms.map(r=>[r.roomId, r])).values())
    return res.status(200).json({success:true, rooms:uniqueRooms})
  } catch (error) {
    return res.status(500).json({msg:"Internal Server Error"})
  }
  
})
router.delete('/delete/:roomId', verifyJWT, async (req, res) => {
  const userId = req.user.id
  const roomId = req.params.roomId
  try {
    if(!roomId){
      return res.status(400).json({msg:"Room Id is required"})
    }
    const session = await CodeSession.findOneAndDelete({userId, roomId})
    if(!session){
      return res.status(404).json({msg:"Room Not Found"})
    }
    return res.status(200).json({success:true, msg:"Room Deleted Successfully"})
  } catch (error) {
    return res.status(500).json({msg:"Something went wrong while deleting the room please try again"})
  }
})

module.exports= router