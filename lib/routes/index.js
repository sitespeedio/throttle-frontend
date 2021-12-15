import { Router } from 'express';
const router = Router();
import { getCurrentProfile, getProfiles } from '../profiles.js';

router.get('/', function (req, res) {
  res.render('index', {
    profile: getCurrentProfile(),
    profiles: getProfiles()
  });
});

export default router;
