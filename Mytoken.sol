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