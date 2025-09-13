//ensure the user is authenticated
exports.ensureauthenticated = (req,res,next)=>{
    if(req.session.user){
      return next()
    }
    res.redirect('/login')
};

//ensure user is a salesagent
exports.ensureAgent = (req,res,next)=>{
    if(req.session.user && req.session.user.role==="Attendant"){
      return next()
    }
    res.redirect('/')
};

//ensure user is a Manager
exports.ensureManager = (req,res,next)=>{
    if(req.session.user && req.session.user.role==="Manager"){
      return next()
    }
    res.redirect('/')
};