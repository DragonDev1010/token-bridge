const BridgePoly = artifacts.require('./BridgePoly.sol');

module.exports = async done => {
    const [recipient, _] = await web3.eth.getAccounts();
    const bridgePoly = await BridgePoly.deployed();
    await bridgePoly.burn(recipient, 1000);
    done();
}