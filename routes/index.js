var express = require('express');
var router = express.Router();
var crypto = require('crypto');

const token = "youkepingtai";
/* GET home page. */
router.get('/api/wechat', function(req, res, next) {
  const {signature, timestamp, nonce, echostr} = req.query;
  if(!signature || !timestamp || !nonce || !echostr) {
    return res.send("invalid request");
  }
  const params = [token, timestamp, nonce];
  params.sort();
  const str = params.join('');
  const hash = crypto.createHash('sha1');
  const sign = hash.update(str.digest('hex'));

  if(sign === signature) {
    res.send(echostr);
  }else {
    res.send('invalid sign');
  }
  // res.render('index', { title: 'Express' });
});

module.exports = router;
