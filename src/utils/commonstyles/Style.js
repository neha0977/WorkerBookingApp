import { COLOR } from "./Color";
const SIZES = {
  base: 10,
  width,
  height,
};
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export const STYLES = {
  // styles for user type screen
  mainContainerType: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLOR.New_Primary,
  },
  logoView: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  LogoStyle: {
    alignSelf: "center",
    height: 200,
    width: "100%",
    borderRadius: 80,
    borderWidth: 1,
    overflow: "hidden",
    resizeMode: "contain",
  },
  mainText: {
    color: COLOR.grey,
    fontSize: 18,
    fontWeight: "500",
    marginVertical: "4%",
  },

  //on boarding screen
 

  container: {
    backgroundColor: COLOR.New_Primary,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  AppLogo: {
    height: 180,
    width: '100%',
    resizeMode:'contain',
    marginTop:18
    // paddingTop:'10%'
  },
  //Sign In screen design
  mainContainer: {
    backgroundColor: COLOR.New_Primary,
    flex: 1,
  },
  logView: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  logText: {
    color: COLOR.New_button,
    fontSize: 28,
    fontWeight: "bold",
  },
  enterDataText: {
    color: COLOR.grey,
    fontSize: 15,
    marginVertical: 2,
  },
  inputView: {
    marginVertical: 20,
  },
  btbLogText: {
    color: COLOR.grey,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  containerForgotpass: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLOR.New_Primary,
    flexDirection: "column",
  },
  backbtnView: {
    width: 40,
    height: 40,
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: COLOR.New_button,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  }, 
   backicon: {
    height: "50%",
    width: "50%",
  }, 
  
  backicon: {
    height: "50%",
    width: "50%",
  },
  forgorPassText: {
    fontSize: 20,
    color: COLOR.New_button,
    marginHorizontal: "7%",
    fontWeight: "500",
  },
  forgotPassSubText: {
    fontSize: 15,
    marginHorizontal: "7%",
    marginVertical: 10,
    color:COLOR.grey
  }, 
  //  dotContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   position: 'absolute',
  // },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
  },
  slide: {
    width: "100%",
    height: 200, // Adjust the height as needed
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
};
