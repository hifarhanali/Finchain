import { Page, Document, StyleSheet } from "@react-pdf/renderer";
import TransactionsView from "./TransactionsView";
import TitleView from "./TitleView";
import UserInfoView from "./UserInfoView";
import CashFlowView from "./CashFlowView";
import ThankYouView from "./ThankYouView";

const themeColor = "rgb(251 191 36)";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontFamily: "Helvetica",
    fontSize: 11,
    padding: 20,
    lineHeight: 1.5,
    flexDirection: "column",
  },
});

const InvoicePdf = ({ transactions, userInfo, income, expense }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <TitleView title="Invoice" color={"black"} />
        <UserInfoView userInfo={userInfo} color={themeColor} />
        <TransactionsView transactions={transactions} color={themeColor} />
        <CashFlowView income={income} expense={expense} color={themeColor} />
        <ThankYouView color={themeColor} />
      </Page>
    </Document>
  );
};

export default InvoicePdf;
