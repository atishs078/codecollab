const express = require('express')
const router = express.Router()
const { exec } = require('child_process')
const  fs = require('fs')
router.post('/run', async (req, res) => {
    const {code, language} = req.body
    if(!code){
        return res.status(400).json({error:"Code is required"})
    }
    if(!language){
        return res.status(400).json({error:"Please Specify your programming langauge"})

    }
    const filename = language ==='python'?'temp.py':'temp.js'
    const runCmd = language ==='python' ? `python ${filename}` : `node ${filename}`
    fs.writeFile(filename, code, (err)=>{
        if(err){
            return res.status(500).json({error:"Error while saving the file please try again"})
        }
        exec(runCmd, (error, stdout, stderr)=>{
            if(error){
                return res.status(500).json({output: stderr || error.message})
            }
            return res.status(200).json({output:stdout})

        })
    })
    
})
module.exports = router