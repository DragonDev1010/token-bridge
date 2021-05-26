const { default: Web3 } = require("web3")

const TokenBsc = artifacts.require('./TokenBSC.sol')

module.exports = async done => {
    const [recipient, _] = await web3.eth.getAccounts()
    const tokenBsc = await TokenBsc.balanceOf(recipient)
    console.log(balance.toString())
    done()
}