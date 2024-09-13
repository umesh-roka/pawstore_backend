

export const handleAll = (req,res)=>{
  return res.status(400).json({
    status:'error',
    message:'method not matched'
  })
}