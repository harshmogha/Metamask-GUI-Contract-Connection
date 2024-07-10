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
            console.error("User denied account access")
        }
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        document.getElementById('connectButton').innerText = 'Wallet Connected';
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

const contractAddress = 'Y0xc4d5177E415a5f5116Dc07Db14273f2755Ef7aAe';
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
    await myContract.methods.burn(address, amount).send({ from: accounts[0] });
    updateBalance(accounts[0]);
});
