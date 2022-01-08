import { Router } from 'express';
const router = Router();
import throttle from '@sitespeed.io/throttle';
import { getProfiles, setCurrentProfile } from '../profiles.js';
const profiles = getProfiles();
import log from 'intel';
const logger = log.getLogger('api');

router.get('/:type', async function (req, res) {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', 0);
  const type = req.params.type;
  if (type === 'stop') {
    logger.debug('Stop throttling');
    await throttle.stop();
    setCurrentProfile(type);
    return res.json({ message: 'Stopped throttling' });
  } else if (type === 'custom') {
    logger.debug('Start custom throttling');
    if (req.query.up && req.query.down && req.query.rtt) {
      await throttle.start({
        up: Number(req.query.up),
        down: Number(req.query.down),
        rtt: Number(req.query.rtt)
      });
      setCurrentProfile(type);
      return res.json({ message: 'Started custom throttling' });
    } else {
      return res.status(400).json({
        message: 'Missing up/down or rtt parameter for custom throttling'
      });
    }
  } else {
    const options = profiles[type];
    if (options) {
      logger.debug('Run throttling as %s', type);
      await throttle.start({
        up: options.up,
        down: options.down,
        rtt: options.rtt
      });
      setCurrentProfile(type);
      return res.json({ message: 'Profile set: ' + type });
    } else {
      logger.error('Profile %s not found', type);
      res.status(400);
      return res.json({ message: 'Unknown profile: ' + type });
    }
  }
});

export default router;
