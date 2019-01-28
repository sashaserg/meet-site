module.exports = (err, req, res, next) => {
    console.log("error Handler");
    console.log(err);
    if(!err.code){
        res.send(err.message);
    } else {

        res.status(err.code).send(err.message);
    }
};
