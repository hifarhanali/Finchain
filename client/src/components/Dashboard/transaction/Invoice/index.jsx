import React from "react";

import InvoicePdf from "./InvoicePdf";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

const fileName = "Invoice.pdf";

const InvoicePdfLink = ({ transactions, userInfo, income, expense }) => {
  return (
    <>
      {/* <PDFViewer width={800} height={500} showToolbar={false}>
        <InvoicePdf
          transactions={transactions}
          userInfo={userInfo}
          income={income}
          expense={expense}
        />
      </PDFViewer> */}

      <PDFDownloadLink
        document={
          <InvoicePdf
            transactions={transactions}
            userInfo={userInfo}
            income={income}
            expense={expense}
          />
        }
        fileName={fileName}
      >
        {({ blob, url, loading, error }) => {
          if (loading) return "Loading document...";
          if (error) return "Error while loading document";
          return (
            <button className="btn btn-primary underline">
              Download Invoice
            </button>
          );
        }}
      </PDFDownloadLink>
    </>
  );
};

export default InvoicePdfLink;
