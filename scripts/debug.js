const assert = require('assert')
const fs = require('fs')
const glob = require('glob')
const Web3 = require('web3')
const { encodeCall } = require('zos-lib')
const contract = require('truffle-contract')

const contractJson = require('../build/contracts/Example.json')

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const Example = contract(contractJson)
Example.setProvider(provider)

const account0 = '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1'

// This fails (with zos)
async function doesntWork () {
  const files = glob.sync('zos.dev-*.json')
  const zosJson = JSON.parse(fs.readFileSync(files[0]))
  const zosProxyAddress = zosJson.proxies['example/Example'][0].address
  console.log('proxy address:', zosProxyAddress)

  const instance = await Example.at(zosProxyAddress)
  const data = encodeCall(
    'addOwner',
    ['address'],
    ['0xffcf8fdee72ac11b5c542428b35eef5769c409f0']
  )
  console.log('data:', data)

  const hasOwner = await instance.hasOwner.call(account0, {
    from: account0
  })

  assert.ok(hasOwner)

  // THIS FAILS WITH ZOS!!
  const result = await instance.submitTransaction(account0, 0, data, {
    from: account0
  })

  console.log(result)

  process.exit(0)
}

// This works (without zos)
async function works () {
  const instance = await Example.new({
    from: account0
  })
  await instance.initialize([account0], 1, {
    from: account0
  })
  console.log('address:', instance.address)

  const data = encodeCall(
    'addOwner',
    ['address'],
    ['0xffcf8fdee72ac11b5c542428b35eef5769c409f0']
  )

  console.log('data:', data)

  const hasOwner = await instance.hasOwner.call(account0, {
    from: account0
  })

  assert.ok(hasOwner)

  // not using zos makes this work
  const result = await instance.submitTransaction(account0, 0, data, {
    from: account0
  })

  console.log(result)

  process.exit(0)
}

// uncomment to run script that works
//works()

// uncomment to run script that doesn't works
doesntWork()
