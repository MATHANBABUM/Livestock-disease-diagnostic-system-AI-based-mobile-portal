// filepath: /d:/livestock_disease/Components/themes.js
import { StyleSheet } from "react-native";

export const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  footer: {
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderColor: "#e7e7e7",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
  footer: {
    padding: 10,
    backgroundColor: "#444",
    borderTopWidth: 1,
    borderColor: "#555",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
});
