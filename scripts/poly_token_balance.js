const { default: Web3 } = require("web3")

const TokenPoly = artifacts.require('./TokenPoly.sol')

module.exports = async done => {
    const [sender, _] = await Web3.eth.getAccounts()
    const tokenPoly = await TokenPoly.deployed()
    const balance = await tokenPoly.balanceOf(sender)
    console.log(balance.toString());
    done()
}