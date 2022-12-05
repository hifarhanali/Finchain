var Ledger = artifacts.require("./Ledger.sol");

contract("Ledger", () => {
    var ledgerInstance = null;

    // Test 1 - Check if the contract is deployed
    it("should be deployed", async () => {
        ledgerInstance = await Ledger.deployed();
        assert(ledgerInstance !== null, "The contract was not deployed");
    });

    // Test 2 - Check if transactions are adding to the ledger
    it("should be able to add a new transaction", async () => {
        // const transaction1 = await ledgerInstance.addTransaction("title1", "description1", 1001, Date.now(), true);
        // assert(transaction1 !== null, "The transaction was not added");

        // const transaction2 = await ledgerInstance.addTransaction("title2", "description2", 1002, Date.now(), false);
        // assert(transaction2 !== null, "The transaction was not added");

        const transactionCount = (await ledgerInstance.getTransactionCount.call()).toNumber();
        assert(transactionCount === 2, "The transaction count is not correct");
    });


    // Test 3 - Check if transactions are fetched correctly
    it("should be able to fetch all transactions", async () => {
        const transactions = await ledgerInstance.getTransactions.call();
        assert(transactions.length === 2, "The transactions were not fetched correctly");
    });


    // Test 4 - Check if collaborators are adding successfully
    it("should be able to add a new collaborator", async () => {

        // address of the collaborator
        const collaboratorAddress = "0x39DB5cd1a00DA4B9DBae80b40BFd5920099A15F9";

        const collaborator1 = await ledgerInstance.addCollaborator(collaboratorAddress);
        assert(collaborator1 !== null, "The collaborator was not added");

        const collaboratorCount = (await ledgerInstance.getCollaboratorCount.call()).toNumber();
        assert(collaboratorCount === 1, "The collaborator count is not correct");
    });

    // Test 5 - Check if collaborators and their transactions are fetched correctly
    it("should be able to fetch all collaborators and their transactions", async () => {
        const collaborators = await ledgerInstance.getCollaborators.call();
        assert(collaborators.length === 1, "The collaborators were not fetched correctly");

        for (let i = 0; i < collaborators.length; i++) {
            console.log("Collaborator: " + collaborators[i]);
            const transactions = await ledgerInstance.getCollaboratorTransactions.call(collaborators[i]);
            console.log("Collaborator " + i + " has " + transactions.length + " transactions");
            assert(transactions.length == 0, "The transactions were not fetched correctly");
        }
    });
});