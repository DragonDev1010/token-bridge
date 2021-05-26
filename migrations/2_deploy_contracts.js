const TokenPoly = artifacts.require('TokenPoly.sol')
const TokenBsc = artifacts.require('TokenBsc.sol')
const BridgePoly = artifacts.require('BridgePoly.sol')
const BridgeBsc = artifacts.require('BridgeBsc.sol')

module.exports = async function(deployer, network, addresses) {
    if(network == 'polyTestnet') {
        await deployer.deploy(TokenPoly)
        const tokenPoly = await TokenPoly.deployed()
        await tokenPoly.mint(addresses[0], 1000)
        await deployer.deploy(BridgePoly, tokenPoly.address)
        const bridgePoly = await BridgePoly.deployed()
        await tokenPoly.updateAdmin(bridgePoly.address)
    }

    if(network == 'bscTestnet') {
        await deployer.deploy(TokenBsc)
        const tokenBsc = await TokenBsc.deployed()
        await deployer.deploy(BridgeBsc, tokenBsc.address)
        const bridgeBsc = await BridgeBsc.deployed()
        await tokenBsc.updateAdmin(bridgeBsc.address)
    }
}