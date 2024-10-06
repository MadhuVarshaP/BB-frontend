// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CommunityAidPlatform {
    struct User {
        address walletAddress;
        string worldcoinID;
        string name;
        string profilePicture;
        bool isVerified;
        uint256 reputation;
    }

    struct Task {
        uint256 taskID;
        string title;
        string description;
        address creator;
        address claimant;
        uint256 bounty;
        uint256 deadline;
        bool isClaimed;
        bool isCompleted;
        string proofData;
        string verificationStatus; // Pending, Approved, Rejected
    }

    uint256 public nextTaskID;
    mapping(address => User) public users;
    mapping(uint256 => Task) public tasks;

    event UserRegistered(
        address indexed walletAddress,
        string worldcoinID,
        bool isVerified
    );
    event TaskCreated(
        uint256 indexed taskID,
        string title,
        address creator,
        uint256 bounty,
        uint256 deadline
    );
    event TaskClaimed(uint256 indexed taskID, address claimant);
    event TaskCompleted(
        uint256 indexed taskID,
        address claimant,
        string proofData
    );
    event TaskVerified(uint256 indexed taskID, string verificationStatus);
    event BountyReleased(uint256 indexed taskID, address claimant);
    event BountyWithdrawn(uint256 indexed taskID, address creator);

    // User registration function
    function registerUser(
        string memory _worldcoinID,
        string memory _name,
        string memory _profilePicture
    ) external {
        require(bytes(_worldcoinID).length > 0, "Worldcoin ID is required");
        users[msg.sender] = User({
            walletAddress: msg.sender,
            worldcoinID: _worldcoinID,
            name: _name,
            profilePicture: _profilePicture,
            isVerified: true, // Assume verification is done externally via Worldcoin
            reputation: 0
        });

        emit UserRegistered(msg.sender, _worldcoinID, true);
    }

    // Function to create a task
    function createTask(
        string memory _title,
        string memory _description,
        uint256 _bounty,
        uint256 _deadline
    ) external payable {
        require(
            users[msg.sender].isVerified,
            "User must be verified to create tasks"
        );
        require(msg.value >= _bounty, "Insufficient value sent for bounty");
        require(_deadline > block.timestamp, "Deadline must be in the future");

        tasks[nextTaskID] = Task({
            taskID: nextTaskID,
            title: _title,
            description: _description,
            creator: msg.sender,
            claimant: address(0),
            bounty: _bounty,
            deadline: _deadline,
            isClaimed: false,
            isCompleted: false,
            proofData: "",
            verificationStatus: "Pending"
        });

        emit TaskCreated(nextTaskID, _title, msg.sender, _bounty, _deadline);
        nextTaskID++;
    }

    // Function to claim a task
    function claimTask(uint256 _taskID) external {
        Task storage task = tasks[_taskID];
        require(!task.isClaimed, "Task is already claimed");
        require(task.deadline > block.timestamp, "Task deadline has passed");

        task.claimant = msg.sender;
        task.isClaimed = true;

        emit TaskClaimed(_taskID, msg.sender);
    }

    // Function to complete a task and submit proof
    function completeTask(uint256 _taskID, string memory _proofData) external {
        Task storage task = tasks[_taskID];
        require(task.isClaimed, "Task is not claimed");
        require(
            task.claimant == msg.sender,
            "Only the claimant can complete the task"
        );
        require(!task.isCompleted, "Task is already completed");

        task.isCompleted = true;
        task.proofData = _proofData;

        emit TaskCompleted(_taskID, msg.sender, _proofData);
    }

    // Function to verify the completion of a task and release bounty
    function verifyTask(uint256 _taskID, bool verified) external {
        Task storage task = tasks[_taskID];
        require(task.isCompleted, "Task is not completed yet");
        require(
            keccak256(bytes(task.verificationStatus)) ==
                keccak256(bytes("Pending")),
            "Task verification status must be pending"
        );

        if (verified) {
            task.verificationStatus = "Approved";
            payable(task.claimant).transfer(task.bounty);
            users[task.claimant].reputation += 1; // Update reputation
            emit BountyReleased(_taskID, task.claimant);
        } else {
            task.verificationStatus = "Rejected";
        }

        emit TaskVerified(_taskID, task.verificationStatus);
    }

    // Function to withdraw bounty if the task is unclaimed and deadline has passed
    function withdrawBounty(uint256 _taskID) external {
        Task storage task = tasks[_taskID];
        require(
            task.creator == msg.sender,
            "Only the creator can withdraw the bounty"
        );
        require(!task.isClaimed, "Task is already claimed");
        require(
            task.deadline < block.timestamp,
            "Task deadline has not passed"
        );
        require(
            keccak256(bytes(task.verificationStatus)) ==
                keccak256(bytes("Pending")),
            "Task is already verified"
        );

        task.verificationStatus = "Withdrawn";
        payable(task.creator).transfer(task.bounty);

        emit BountyWithdrawn(_taskID, msg.sender);
    }

    // Function to view user details
    function getUserDetails(
        address _userAddress
    )
        external
        view
        returns (
            string memory name,
            string memory profilePicture,
            bool isVerified,
            uint256 reputation
        )
    {
        User storage user = users[_userAddress];
        return (
            user.name,
            user.profilePicture,
            user.isVerified,
            user.reputation
        );
    }

    // Function to view task details
    function getTaskDetails(
        uint256 _taskID
    )
        external
        view
        returns (
            string memory title,
            string memory description,
            address creator,
            address claimant,
            uint256 bounty,
            uint256 deadline,
            bool isClaimed,
            bool isCompleted,
            string memory proofData,
            string memory verificationStatus
        )
    {
        Task storage task = tasks[_taskID];
        return (
            task.title,
            task.description,
            task.creator,
            task.claimant,
            task.bounty,
            task.deadline,
            task.isClaimed,
            task.isCompleted,
            task.proofData,
            task.verificationStatus
        );
    }
}
