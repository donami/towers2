const GOOGLE_API_KEY = 'AIzaSyAVDQ0TEStpgqBt6jRpnSJYQvg3mxWDcag';

class MapService {
  constructor() {
    'ngInject';
  }

  // Get link to image of map from towers lat and longitude
  getMap(latitude, longitude) {
    if (latitude && longitude) {
      return 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude + '&zoom=13&size=600x300&markers=color:green%7C' + latitude + ',' + longitude + '&key=' + GOOGLE_API_KEY;
    }
    return false;
  }

}

export default MapService;
