

function asyncFuncErrorHandler(asyncFunc){
    return ((req,res,next)=>{
         asyncFunc(req,res,next).catch((err)=>next(err));
    })
} 

module.exports = asyncFuncErrorHandler;