export const IMAGES = {
  //catogryicon
  COOKING: "COOKING",
  BEAUTY: "BEAUTY",
  CLEANING: "CLEANING",
  IRON: "IRON",
  PAINTING: "PAINTING",
  PLUMBING: "PLUMBING",
  SALOON: "SALOON",
  REPAIRING: "REPARING",
  TRASHING: "TRASHING",
  WASHING_CLOTHES: "WASHING_CLOTHES",
  VEHICAL_WASH: "VEHICAL_WASH",
  BACK_ICON: "BACK_ICON",
  FORWORD_ICON: "FORWORD_ICON",
  PAINTER: "PAINTER",
  IRON_MEN: "IRON_MEN",
  MACHANIC: "MACHANIC",
  BARBAR: "BARBAR",
  BEAUTY_SALON: "BEAUTY_SALON",
  WASHER: "WASHER",
  CLEANER: "CLEANER",
  SEARCH: "SEARCH",
  NOTIFICATION: "NOTIFICATION",
  HOME_LOGO: "HOME_LOGO",
  LOGOUT:"LOGOUT",
  LOGO:"LOGO"
};
const getImage = (name) => {
  let iconName;
  switch (name) {
    case IMAGES.COOKING:
      iconName = require("../assets/img/cooking.png");
      break;
    case IMAGES.CLEANING:
      iconName = require("../assets/img/cleaning.png");
      break;
    case IMAGES.BEAUTY:
      iconName = require("../assets/img/beauty.png");
      break;
    case IMAGES.IRON:
      iconName = require("../assets/img/iron.png");
      break;
    case IMAGES.PAINTING:
      iconName = require("../assets/img/painting.png");
      break;
    case IMAGES.PLUMBING:
      iconName = require("../assets/img/plumbing.png");
      break;
    case IMAGES.SALOON:
      iconName = require("../assets/img/saloon.png");
      break;
    case IMAGES.REPAIRING:
      iconName = require("../assets/img/tools.png");
      break;
    case IMAGES.VEHICAL_WASH:
      iconName = require("../assets/img/vehicalcleaning.png");
      break;
    case IMAGES.WASHING_CLOTHES:
      iconName = require("../assets/img/washing.png");
      break;
    case IMAGES.TRASHING:
      iconName = require("../assets/img/trashing.png");
      break;
    case IMAGES.BACK_ICON:
      iconName = require("../assets/img/left.png");
      break;
    case IMAGES.FORWORD_ICON:
      iconName = require("../assets/img/next.png");
      break;
    case IMAGES.BEAUTY_SALON:
      iconName = require("../assets/img/beauty.png");
      break;
    case IMAGES.BARBAR:
      iconName = require("../assets/img/barbar.png");
      break;
    case IMAGES.WASHER:
      iconName = require("../assets/img/washer.png");
      break;
    case IMAGES.CLEANER:
      iconName = require("../assets/img/homeclean.png");
      break;
    case IMAGES.PAINTER:
      iconName = require("../assets/img/painter.png");
      break;
    case IMAGES.IRON_MEN:
      iconName = require("../assets/img/ironing.png");
      break;
    case IMAGES.MACHANIC:
      iconName = require("../assets/img/reparing.png");
      break;
    case IMAGES.SEARCH:
      iconName = require("../assets/img/search.png");
      break;
    case IMAGES.NOTIFICATION:
      iconName = require("../assets/img/notification.png");
      break;
    case IMAGES.HOME_LOGO:
      iconName = require("../assets/img/logoHome.png");
      break;
      case IMAGES.LOGOUT:
      iconName = require("../assets/img/turn-off.png");
      break;
      case IMAGES.LOGO:
        iconName = require("../assets/AppLogo/logo.png");
        break;
      
    default:
      break;
  }
  return iconName;
};

export const getImageFromURL = (url) => {
  if (url) {
    const name = url.substr(url.lastIndexOf("/") + 1);
    return getImage(name);
  }
  return -1;
};
