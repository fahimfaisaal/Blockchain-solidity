// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// First we have to specify the version on solidity

contract SimpleStorage {
    // Data types of solidity
    // boolean, uint, int, address, bytes
    // bool hasFavoriteNumber = false;
    // uint8 favoriteNumber = 5;
    // string favoriteNumberInText = "five";
    // int8 negativeFavoriteNumber = -5;
    // address myAddress = 0x0AeDq5F0431F83d1938c6432d36B9E64595abdFf
    // bytes32 favoriteNumberBytes = "five"

    struct User {
        string name;
        uint8 favoriteNumber;
    }

    uint256 randomNumber;
    User[] public users;
    mapping(string => uint8) public usersMap;

    function storeRandomNumber(uint256 _randNumber) public {
        randomNumber = _randNumber;
    }

    // there are two types of function view and pure
    // Remember these functions will not charge gas fees. until these are invoked from the state changer function cause it charged while contract state will change
    function retriveRandomNumber() public view returns (uint256) {
        return randomNumber;
    }

    // calldata, memory, storage -> these keywords will use with only reference type data like map, stack, list, string
    function addUser(string memory _name, uint8 _favoriteNumber) public {
        users.push(User(_name, _favoriteNumber));
        usersMap[_name] = _favoriteNumber;
    }
}
