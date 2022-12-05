import { Text, View, StyleSheet } from "@react-pdf/renderer";

const TitleView = ({ title, color }) => {
  const styles = StyleSheet.create({
    titleContainer: {
      marginTop: 24,
    },
    reportTitle: {
      color: color,
      letterSpacing: 4,
      fontSize: 25,
      textAlign: "center",
      textTransform: "uppercase",
    },
  });

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.reportTitle}>{title}</Text>
    </View>
  );
};

export default TitleView;
