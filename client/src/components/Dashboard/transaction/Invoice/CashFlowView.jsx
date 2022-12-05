import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const CashFlowView = ({ income, expense, color }) => {
  const styles = StyleSheet.create({
    firstRow: {
      flexDirection: "row",
      marginTop: 36,
      justifyContent: "flex-end",
    },
    otherRows: {
      flexDirection: "row",
      justifyContent: "flex-end",
      width: "auto",
      borderBottomColor: color,
      borderBottomWidth: 2,
    },
    value: {
      fontSize: 12,
      fontStyle: "bold",
    },
    label: {
      width: 60,
    },
  });

  return (
    <Fragment>
      <View style={styles.firstRow}>
        <Text style={styles.label}>Cash In:</Text>
        <Text style={styles.value}>{income}</Text>
      </View>
      <View style={styles.otherRows}>
        <Text style={styles.label}>Cash Out:</Text>
        <Text style={styles.value}>{expense}</Text>
      </View>
      <View style={styles.otherRows}>
        <Text style={styles.label}>Net:</Text>
        <Text style={styles.value}>{income - expense}</Text>
      </View>
    </Fragment>
  );
};

export default CashFlowView;
