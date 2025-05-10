import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ onHomePress, onThemePress, isDarkMode }) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={onHomePress}>
          <Ionicons name="home" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>  DISEASE DIAGNOSTIC</Text>
      </View>

      {/* Theme Switch Button */}
      <TouchableOpacity onPress={onThemePress} style={styles.themeSwitch}>
        <Ionicons
          name={isDarkMode ? "sunny" : "moon"}
          size={25}
          color={isDarkMode ? "silver" : "lightblue"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#6c757d",
    elevation: 4,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "times new roman",
    marginLeft: 17,
    color: "white",
  },
  themeSwitch: {
    padding: 10,
  },
});

export default Header;
