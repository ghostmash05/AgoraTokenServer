const express  = require('express');
const {RtcTokenBuilder, RtcRole} = require('agora-access-token');

const PORT = 3000;

const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

const app = express();

const nocache = (req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
}

app.use(nocache);

const generateToken = (req, res) => {
    req.header('Access-Control-Allow-Origin', '*');
  const channelName = req.query.channelName;
  const uid = req.query.uid;
  const role = req.query.role;

  if (!channelName || !uid || !role) {
    return res.status(400).send('Missing parameters');
  }

  let roleType;
  if (role === 'publisher') {
    roleType = RtcRole.PUBLISHER;
  } else if (role === 'subscriber') {
    roleType = RtcRole.SUBSCRIBER;
  } else {
    return res.status(400).send('Invalid role');
  }

  const expirationTimeInSeconds = 3600; // Token valid for 1 hour
  const currentTimestamp = Math.floor(Date.now() / 1000);
  
  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    roleType,
    currentTimestamp + expirationTimeInSeconds
  );

  res.json({ token });
}

app.get('/generate-token', generateToken);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});