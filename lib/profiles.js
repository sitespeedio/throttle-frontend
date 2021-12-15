const profiles = {
  '3g': {
    down: 1600,
    up: 768,
    rtt: 150
  },
  '3gfast': {
    down: 1600,
    up: 768,
    rtt: 75
  },
  '3gslow': {
    down: 400,
    up: 400,
    rtt: 200
  },
  '2g': {
    down: 280,
    up: 256,
    rtt: 400
  },
  cable: {
    down: 5000,
    up: 1000,
    rtt: 14
  },
  dsl: {
    down: 1500,
    up: 384,
    rtt: 25
  },
  '3gem': {
    down: 400,
    up: 400,
    rtt: 200
  },
  '4g': {
    down: 9000,
    up: 9000,
    rtt: 85
  },
  lte: {
    down: 12000,
    up: 12000,
    rtt: 35
  },
  edge: {
    down: 240,
    up: 200,
    rtt: 420
  },
  dial: {
    down: 49,
    up: 30,
    rtt: 60
  },
  fois: {
    down: 20000,
    up: 5000,
    rtt: 2
  }
};

let currentProfile = 'stop';

export function getProfiles() {
  return profiles;
}

export function getCurrentProfile() {
  return currentProfile;
}

export function setCurrentProfile(name) {
  currentProfile = name;
}
