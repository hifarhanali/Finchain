import { StyleSheet } from "@react-pdf/renderer";
import { Text, View } from "@react-pdf/renderer";

const TransactionsView = ({ transactions, color }) => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      borderBottomColor: color,
      borderBottomWidth: 2,
      alignItems: "center",
      fontStyle: "bold",
      padding: 5,
      paddingTop: 10,
    },
    title: {
      width: "15%",
      textAlign: "left",
      paddingLeft: 8,
    },
    description: {
      width: "50%",
      textAlign: "left",
      paddingLeft: 8,
    },
    date: {
      width: "15%",
      textAlign: "right",
      paddingRight: 8,
    },
    amount: {
      width: "10%",
      textAlign: "right",
      paddingRight: 8,
    },
    flow: {
      width: "10%",
      textAlign: "right",
      paddingRight: 8,
    },
  });
  return (
    <>
      <View
        style={{
          ...styles.row,
          backgroundColor: color,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text style={styles.title}>Title</Text>
        <Text style={styles.description}>Description</Text>
        <Text style={styles.date}>Created at</Text>
        <Text style={styles.amount}>Amount</Text>
        <Text style={styles.flow}>Flow</Text>
      </View>
      {transactions.map((transaction) => (
        <View style={styles.row} key={transaction.id}>
          <Text style={styles.title}>{transaction.title}</Text>
          <Text style={styles.description}>{transaction.description}</Text>
          <Text style={styles.date}>
            {new Date(transaction.date).toLocaleDateString()}
          </Text>
          <Text style={styles.amount}>{transaction.amount}</Text>
          <Text style={styles.flow}>
            {transaction.isExpense ? "Cash Out" : "Cash In"}
          </Text>
        </View>
      ))}
    </>
  );
};

export default TransactionsView;
