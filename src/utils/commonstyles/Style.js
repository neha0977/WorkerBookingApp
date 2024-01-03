import { COLOR } from "./Color";

export const STYLES = {
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  AppLogo: {
    height: 200,
    width: '100%',
    resizeMode:'contain',
    paddingTop:'5%'
  },
  //Sign In screen design
  mainContainer: {
    backgroundColor: COLOR.white,
    flex: 1
  },
  logView: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  logText: {
    color: COLOR.black,
    fontSize: 28,
    fontWeight: "bold"
  },
  enterDataText: {
    color: COLOR.grey,
    fontSize: 15,
    marginVertical: 2
  },
  inputView: {
    marginVertical: 20
  },
  btbLogText: {
    color: COLOR.black,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  containerForgotpass: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLOR.black,
    flexDirection: "column",
  },backbtnView: {
    width: 40,
    height: 40,
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "white",
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },  backicon: {
    height: "50%",
    width: "50%",
  }, forgorPassText: {
    fontSize: 20,
    color: "#000",
    marginHorizontal: "7%",
    fontWeight: "500",
  },forgotPassSubText: {
    fontSize: 15,
    marginHorizontal: "7%",
    marginVertical: 10,
  },
};
