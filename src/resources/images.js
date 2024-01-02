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
  BACK_ICON:"BACK_ICON"
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
