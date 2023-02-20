const { ethers } = require('ethers')
const fs = require('fs-extra')
const { TextEncoder } = require('text-encoding');
async function main() {
  const encoder = new TextEncoder()
  const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545')
  const wallet = new ethers.Wallet(encoder.encode('432a067a56c304dabf0c8e9d724b377c07b3acaccfd4ece96d81d490147f81c1'), provider)
  console.log({ wallet })
  const abi = fs.readFileSync('./bin/contracts_SimpleStorage_sol_SimpleStorage.abi', 'utf8');
  const binary = fs.readFileSync('./bin/contracts_SimpleStorage_sol_SimpleStorage.bin', "utf8");

  console.log({ abi, binary })
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log('Deploying...')
  const contract = await contractFactory.deploy()
  console.log('Deployment done contract ->', contract)
}

main()
