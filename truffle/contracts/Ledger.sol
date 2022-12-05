// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Ledger {
    struct Transaction {
        uint256 id;
        string title;
        string description;
        uint256 amount;
        uint256 date;
        bool isExpense;
    }

    constructor() {
        addTransaction(
            "Salary",
            "Salary distributed among team members",
            50000,
            block.timestamp,
            true
        );
        addTransaction(
            "Investment",
            "Return on Systems Ltd. investment",
            1001,
            block.timestamp,
            true
        );
    }

    // address to Transactions mapping
    mapping(address => Transaction[]) public transactions;

    // address to addresses mapping
    mapping(address => address[]) public collaborators;

    modifier collaboratorNotExist(address _collaborator) {
        bool exists = false;
        for (uint256 i = 0; i < collaborators[_collaborator].length; i++) {
            if (collaborators[_collaborator][i] == msg.sender) {
                exists = true;
                break;
            }
        }
        require(!exists, "Collaborator already exists");
        _;
    }

    event CollaboratorAdded(address indexed _collaborator);

    modifier notSender(address _collaborator) {
        require(msg.sender != _collaborator, "Sender cannot be collaborator");
        _;
    }

    // add collaborator only if not already added
    function addCollaborator(address _collaborator)
        public
        notSender(_collaborator)
        collaboratorNotExist(_collaborator)
    {
        collaborators[_collaborator].push(msg.sender);
        emit CollaboratorAdded(_collaborator);
    }

    // get collaborators
    function getCollaborators() public view returns (address[] memory) {
        return collaborators[msg.sender];
    }

    // get collaborators count
    function getCollaboratorCount() public view returns (uint256) {
        return collaborators[msg.sender].length;
    }

    // modifier to check if it's a valid collaborator
    modifier validCollaborator(address _collaborator) {
        bool isValid = false;
        for (uint256 i = 0; i < collaborators[msg.sender].length; i++) {
            if (collaborators[msg.sender][i] == _collaborator) {
                isValid = true;
                break;
            }
        }
        require(isValid, "Not a valid collaborator");
        _;
    }

    // get transactions of a collaborator
    function getCollaboratorTransactions(address _collaborator)
        public
        view
        validCollaborator(_collaborator)
        returns (Transaction[] memory)
    {
        return transactions[_collaborator];
    }

    // event to be emitted when a transaction is added
    event TransactionAdded(
        uint256 id,
        string title,
        string description,
        uint256 amount,
        uint256 date,
        bool isExpense
    );

    // add transaction of an address
    function addTransaction(
        string memory _title,
        string memory _description,
        uint256 _amount,
        uint256 _date,
        bool _isExpense
    ) public {
        transactions[msg.sender].push(
            Transaction(
                transactions[msg.sender].length,
                _title,
                _description,
                _amount,
                _date,
                _isExpense
            )
        );

        emit TransactionAdded(
            transactions[msg.sender].length - 1,
            _title,
            _description,
            _amount,
            _date,
            _isExpense
        );
    }

    // get all transactions of a user
    function getTransactions() public view returns (Transaction[] memory) {
        return transactions[msg.sender];
    }

    // get transaction of an address
    function getTransaction(uint256 _id)
        public
        view
        returns (Transaction memory)
    {
        return transactions[msg.sender][_id];
    }

    // get transaction count of an address
    function getTransactionCount() public view returns (uint256) {
        return transactions[msg.sender].length;
    }
}
