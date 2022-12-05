import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const UserInfoView = ({ userInfo, color }) => {
  const styles = StyleSheet.create({
    headerContainer: {
      marginTop: 36,
      justifyContent: "flex-start",
      width: "50%",
    },
    invoiceTo: {
      marginTop: 20,
      paddingBottom: 3,
      fontFamily: "Helvetica-Oblique",
    },
  });

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.invoiceTo}>Invoice to:</Text>
      <Text>{userInfo.address}</Text>
    </View>
  );
};

export default UserInfoView;
