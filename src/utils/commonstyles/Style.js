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
    width: 200,
  },
  //Sign In screen design
  mainContainer: { backgroundColor: COLOR.white, flex: 1 },
  logView: { paddingTop: 50, paddingHorizontal: 20 },
  logText: { color: COLOR.black, fontSize: 40, fontWeight: "bold" },
  enterDataText: { color: COLOR.grey, fontSize: 18, marginVertical: 10 },
  inputView: { marginVertical: 20 },
  btbLogText: {
    color: COLOR.black,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
};
