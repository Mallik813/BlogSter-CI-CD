const Buffer = require('safe-buffer').Buffer;
const keyGrip = require('keygrip');
const keys = require('../../config/keys');
const keygrip = new keyGrip([keys.cookieKey]);

module.exports = user => {
  //generate a base64 string for a session 
  const sessionObject = {
    passport: {
      user: user._id.toString()
    }
  };
  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString('base64');
  //generate session.sig
  const sig = keygrip.sign('session=' + sessionString);

  return { session: sessionString, sig };
}