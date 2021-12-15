import { Router } from 'express';
const router = Router();
import { getCurrentProfile, getProfiles } from '../profiles.js';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json'));

router.get('/', function (req, res) {
  res.render('index', {
    profile: getCurrentProfile(),
    profiles: getProfiles(),
    version: pkg.version
  });
});

export default router;
