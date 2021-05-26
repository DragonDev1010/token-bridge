const Web3 = require('web3')
const BridgePoly = require('../build/contracts/BridgePoly.json')
const BridgeBsc = require('../build/contracts/BridgeBsc.json')

const web3Poly = new Web3('https://rpc-endpoints.superfluid.dev/mumbai')
const web3Bsc = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/')
const adminPriveKey = ''
const { address: admin } = web3Bsc.eth.accounts.wallet.add(adminPriveKey)

const bridgeBsc = new web3Bsc.eth.Contract(
    BridgeBsc.abi,
    BridgeBsc.networks['97'].address
)

// Polygon Testnet
const bridgePoly = new web3Poly.eth.Contract(
    BridgePoly.abi,
    BridgePoly.networks['80001'].address
)

bridgePoly.events.Transfer(
    {fromBlock: 0, step: 0}
).on('data', async event => {
    const {from, to, amount, date, nonce} = event.returnValues
    const tx = bridgeBsc.methods.mint(to, amount, nonce)
    const [gasPrice, gasCost] = await Promise.all([
        web3Bsc.eth.getGasPrice(),
        tx.estimateGas({from: admin})
    ])
    const data = tx.encodeABI()
    const txData = {
        from: admin,
        to: bridgeBsc.options.address,
        data,
        gas: gasCost,
        gasPrice
    }
    const receipt = await web3Bsc.eth.sendTransaction(txData)
    console.log(`Transaction hash: ${receipt.transactionHash}`)
    console.log(`
        Processed transfer:
        - from ${from}
        - to ${to}
        - amount ${amount} tokens
        - data ${date}
    `)
})
