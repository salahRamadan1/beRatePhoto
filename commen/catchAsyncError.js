module.exports.createTryAndCatch =(fn)=> {
    return (req, res) => {
      fn(req, res).catch((err) => {
        res.json(err);
      });
    };
  }