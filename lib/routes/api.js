import { Router } from 'express';
const router = Router();
import throttle from '@sitespeed.io/throttle';
import { getProfiles, setCurrentProfile } from '../profiles.js';
const profiles = getProfiles();

router.get('/:type', async function (req, res) {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', 0);
  const type = req.params.type;
  if (type === 'stop') {
    await throttle.stop();
    return res.json({ message: 'Stopped throttling' });
  } else {
    const options = profiles[type];
    if (options) {
      console.log('Run throttling for %s', type);
      await throttle.start({
        up: options.up,
        down: options.down,
        rtt: options.rtt
      });
      setCurrentProfile(type);
      return res.json({ message: 'Profile set' + type });
    } else {
      res.status(400);
      return res.json({ message: 'Unknown profile:' + type });
    }
  }
});

export default router;
