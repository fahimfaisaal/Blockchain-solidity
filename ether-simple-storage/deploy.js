const { ethers } = require('ethers')
const fs = require('fs-extra')
require('dotenv').config()

async function main() {
  console.log(process.env)
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_ENDPOINT)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  const abi = fs.readFileSync('./bin/contracts_SimpleStorage_sol_SimpleStorage.abi', 'utf8');
  const binary = fs.readFileSync('./bin/contracts_SimpleStorage_sol_SimpleStorage.bin', "utf8");

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  
  console.log('Deploying...')
  const contract = await contractFactory.deploy()
  await contract.deployTransaction.wait(1)
  console.log('Deployed successfully')

  const prevFavNumber = await contract.retriveRandomNumber();
  console.log(`Current Fav number ${prevFavNumber.toString()}`)

  const txResponse = await contract.storeRandomNumber("10");
  await txResponse.wait(1)

  const updateFavNumber = await contract.retriveRandomNumber();
  console.log(`Current Fav number ${updateFavNumber.toString()}`)
}

main()
