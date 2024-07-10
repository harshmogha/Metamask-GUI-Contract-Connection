# Metamask-GUI-Contract-Connection
### MyToken DApp

This project is a simple decentralized application (DApp) that interacts with a custom Ethereum token contract deployed on the blockchain. The DApp allows users to connect their MetaMask wallet, view their token balance, mint new tokens, and burn existing tokens.

## Introduction
The MyToken DApp provides an interface for interacting with the MyToken smart contract. Users can connect their MetaMask wallet to the DApp, view their token balance, mint new tokens to a specified address, and burn tokens from a specified address.

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
- Node.js
- MetaMask browser extension

## Getting Started
1. Clone this repository to your local machine:
    ```sh
    git clone https://github.com/your-username/mytoken-dapp.git
    ```
2. Navigate to the project directory:
    ```sh
    cd mytoken-dapp
    ```
3. Install the necessary dependencies:
    ```sh
    npm install
    ```
4. Open the `index.html` file in your preferred web browser.

## Usage
### Connecting MetaMask
1. Open the `index.html` file in your browser.
2. Click the "Connect Wallet" button.
3. MetaMask will prompt you to connect your wallet. Approve the connection.

### Viewing Balance
- Once connected, your wallet address and token balance will be displayed on the page.

### Minting Tokens
1. Enter the recipient's address in the "Recipient Address" field.
2. Enter the amount of tokens to mint in the "Amount" field.
3. Click the "Mint" button to mint tokens.

### Burning Tokens
1. Enter the address from which tokens will be burned in the "Address" field.
2. Enter the amount of tokens to burn in the "Amount" field.
3. Click the "Burn" button to burn tokens.

## Contract
The smart contract is written in Solidity and deployed on the Ethereum blockchain. It includes functionalities to mint and burn tokens.

### Solidity Code
```solidity
pragma solidity 0.8.0;

contract MyToken {

    string public tokenName = "Harsh";
    string public tokenAbbrv = "MTK";
    uint256 public totalSupply;

    mapping(address => uint256) public balances;

    function mint(address _to, uint256 _value) public {
        totalSupply += _value; 
        balances[_to] += _value; 
    }

    function burn(address _from, uint256 _value) public {
        require(balances[_from] >= _value, "Insufficient balance to burn"); 
        totalSupply -= _value; 
        balances[_from] -= _value; 
    }
}
```

## HTML
The HTML file provides the structure and layout for the DApp interface.

### `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyToken DApp</title>
    <script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js/dist/web3.min.js"></script>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }
        .container {
            text-align: center;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        input, button {
            margin: 5px 0;
            padding: 10px;
            width: 100%;
            max-width: 300px;
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Connect Metamask</h2>
        <button id="connectButton">Connect Wallet</button>
        <p>Address: <span id="address"></span></p>
        <p>Balance: <span id="balance"></span> MTK</p>

        <h3>Mint Tokens</h3>
        <input type="text" id="mintAddress" placeholder="Recipient Address">
        <input type="number" id="mintAmount" placeholder="Amount">
        <button id="mintButton">Mint</button>

        <h3>Burn Tokens</h3>
        <input type="text" id="burnAddress" placeholder="Address">
        <input type="number" id="burnAmount" placeholder="Amount">
        <button id="burnButton">Burn</button>
    </div>
    <script src="app.js"></script>
</body>
</html>
```

## JavaScript
The JavaScript file handles the interaction between the DApp and the Ethereum blockchain.

### `app.js`
```javascript
window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            document.getElementById('connectButton').innerText = 'Wallet Connected';
            const accounts = await web3.eth.getAccounts();
            document.getElementById('address').innerText = accounts[0];
            updateBalance(accounts[0]);
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        document.getElementById('connectButton').innerText = 'Wallet Connected';
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

const contractAddress = '0x3cA38E089Cd3BF3cF24Dabc40dF0c988075b2729';
const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokenAbbrv",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokenName",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const myContract = new web3.eth.Contract(abi, contractAddress);

async function updateBalance(address) {
    const balance = await myContract.methods.balances(address).call();
    document.getElementById('balance').innerText = balance;
}

document.getElementById('mintButton').addEventListener('click', async () => {
    const address = document.getElementById('mintAddress').value;
    const amount = document.getElementById('mintAmount').value;
    const accounts = await web3.eth.getAccounts();
    await myContract.methods.mint(address, amount).send({ from: accounts[0] });
    updateBalance(accounts[0]);
});

document.getElementById('burnButton').addEventListener('click', async () => {
    const address = document.getElementById('burnAddress').value;
    const amount = document.getElementById('burnAmount').value;
    const accounts = await web3.eth.getAccounts();
    await myContract.methods.burn(address

, amount).send({ from: accounts[0] });
    updateBalance(accounts[0]);
});
```

