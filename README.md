SOIL-ex
=======
[![Build Status](https://travis-ci.org/etherex/etherex.svg?branch=master)](https://travis-ci.org/etherex/etherex)
[![Dependency Status](https://david-dm.org/etherex/etherex.svg?path=frontend)](https://david-dm.org/etherex/etherex?path=frontend)
[![devDependency Status](https://david-dm.org/etherex/etherex/dev-status.svg?path=frontend)](https://david-dm.org/etherex/etherex?path=frontend#info=devDependencies)
[![SlackIn](http://slack.etherex.org/badge.svg)](http://slack.etherex.org) [![Join the chat at https://gitter.im/etherex/etherex](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/etherex/etherex?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Decentralized asset exchange built on SOILcoin, forked from EtherEx.

<img src="/frontend/screenshot.png" />

About
-----

This repository contains the source code that runs the exchange on Ethereum as a set of contracts, along with the UI, tests, tools and documentation.


Components
----------

* contracts: Ethereum contracts in [Serpent](https://github.com/ethereum/serpent)
* frontend: [React.js](https://github.com/facebook/react) UI
* tests: EtherEx tests


Requirements
------------
* [Serpent](https://github.com/ethereum/serpent) compiler by Vitalik Buterin
* [go-ethereum](https://github.com/ethereum/go-ethereum) client by Jeffrey Wilcke
* [pyethereum](https://github.com/ethereum/pyethereum) Python Ethereum client (tests only)
* [PyEPM](https://github.com/etherex/pyepm) for deployment
* [node](http://nodejs.org/) and [grunt](http://gruntjs.com/) for UI development


Installation
------------

Start by cloning this repository.

```
git clone https://github.com/abvhiael/etherex.git
```


### Development / testing

This will install `pyethereum` and `ethereum-serpent` if you don't already have those installed.

```
pip install -r dev_requirements.txt
```

#### Running tests

```
py.test -vvrs
```

Refer to [Serpent](https://github.com/ethereum/serpent) and [pyethereum](https://github.com/ethereum/pyethereum) for their respective usage.


### UI development

You will need a working node.js setup ([instructions](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)) and globally installed `grunt-cli` ([instructions](http://gruntjs.com/getting-started)).

```
cd frontend
npm install
grunt
```

And open `http://localhost:8089/` in your browser.

### Deployment

Requires a local client (Go or C++) with JSONRPC, [Serpent](https://github.com/ethereum/serpent) and [PyEPM](https://github.com/etherex/pyepm)

```
cd contracts
pyepm EtherEx.yaml
```

***I've found, with SOILcoin, the best method of deploying the contracts is to launch gsoil.exe with the command line, to open an RPC connection, where 127.0.0.1 would be your locally hosted copy of SOIL-ex, or another server address would be a server hosted copy of the SOIL-ex front end.
```
gsoil --rpc --rpccorsdomain http://127.0.0.1:8089 --unlock 0 console
```

Deploying the contract .yaml file using pyepm in the code above resulted in a lot of failed compiling. I suggest using the following, replacing your wallet address that is being used to deploy the contracts:

```
pyepm EtherEx.yaml -a 0x012345
```


API
---

* The API is the format of the data field for the Ethereum transactions.
* Subcurrencies need to support the [Subcurrency API](#subcurrency-api).
* You only need an Ethereum client to use the API.


## Operations

Methods (with serpent type definitions):
```
[
  price:[int256]:int256,
  buy:[int256,int256,int256]:int256,
  sell:[int256,int256,int256]:int256,
  trade:[int256,int256[]]:int256,
  cancel:[int256]:int256,
  deposit:[int256,int256]:int256,
  withdraw:[int256,int256]:int256,
  add_market:[int256,int256,int256,int256,int256,int256]:int256,
  get_market_id:[int256]:int256,
  get_last_market_id:[]:int256,
  get_market:[int256]:int256[],
  get_trade:[int256]:int256[],
  get_trade_ids:[int256]:int256[],
  get_sub_balance:[int256,int256]:int256[]
]
```


## Price API
```
price(market_id)
```


## Trade API

### Add buy / sell trade
```
buy(amount, price, market_id)
sell(amount, price, market_id)
```

### Trade
```
trade(max_amount, trade_ids)
```

### Deposit
```
deposit(amount, market_id)
```

### Withdraw
```
withdraw(amount, market_id)
```

### Cancel trade
```
cancel(trade_id)
```

### Adding a market
```
add_market(currency_name, contract_address, decimal_precision, price_denominator, minimum_total, category)
```

### Getting a market's ID
```
get_market_id(contract_address)
```

#### Market names

Market names follow the "<currency name>/ETH" convention. When registering a new market, submit the currency name as a three or four letter uppercase identifier, ex.: "BOB" for BobCoin.

#### Contract address

The subcurrency contract address.

#### Decimal precision

The subcurrency's decimal precision as an integer.

#### Price denominator

* Denominator for price precision, ex. 10000 (10000 => 1 / 10000 => 0.0001)

#### Minimum trade total
When adding a subcurrency, set the minimum trade total high enough to make economic sense. A minimum of 1 SOIL (100000000000000000000 wei) is recommended.

#### Categories
```
1 = Subcurrencies
2 = Crypto-currencies
3 = Real-world assets 
4 = Fiat currencies
```
SOIL-ex will allows you to categorize your assets into four main categories. Since everything is presently represented as subcurrencies, those categories are simply for convenience, and will be better enabled as we scale further towards full decentralized cryptocurrency exchange ability. 
If you have a privtely issued token, DAO issued share, etc, that would go in the regular subcurrency section `1`. 
For other crypto-currencies like BTC, ETH, or DOGE redeemable through a gateway, add it to `2`. 
If your token represents a real-world asset or commodity like gold, minerals, etc. add it to `3`.
If your token represents a fiat currency redeemable through a gateway, add it to `4`.  

#### Market IDs
```
1 = DEV/SOIL
```
New market IDs will be created as DAO creators and token administrators add their subcurrency to the exchange.


### Subcurrency API

**Subcurrency contracts need to support the [Standardized Contract APIs](https://github.com/ethereum/wiki/wiki/Standardized_Contract_APIs) (see [current Draft](https://github.com/ethereum/EIPs/issues/20)), more specifically the `approve`, `transferFrom` and `allowance` methods for deposits, the `transfer` method for withdrawals and the `balanceOf` method for the UI to display the user's balance.**

See the example [ETX](https://github.com/etherex/etherex/blob/master/contracts/etx.se) contract for a Serpent implementation, or a [Standard Token](https://github.com/ConsenSys/Tokens/blob/master/Token_Contracts/contracts/Standard_Token.sol) in Solidity.

After registering the subcurrency using the `add_market` ABI call, the subcurrency will receive a `market_id`. You can retrieve the market ID with a call to `get_market_id(contract_address)`.

#### Deposit support

To support deposits to EtherEx, your subcurrency needs to implement the `approve` and `transferFrom` methods. The former allows a one-time transfer from the user's address by the exchange's contract, while the latter is called from the contract to effectively make that transfer when the user calls the exchange's new `deposit` method. This allows to securely send a subcurrency's tokens to the exchange's contract while updating the user's available balance at the exchange.

#### Withdrawal support

If your subcurrency's default method for transferring funds is also named `transfer` like the standard examples above, with the `_to` and `_value` parameters (in that order), then there is nothing else you need to do to support withdrawals from SOIL-ex to a user's address. Otherwise, you'll need to implement that same `transfer` method with those two parameters, and "translate" that method call to yours, calling your other method with those parameters, in the order they're expected. You may also have to use `tx.origin` instead of `msg.sender` in your method as the latter will return your contract's address.

```
def transfer(_to, _value):
    return(self.invertedtransfer(_value, _to))
```

#### Balance

Subcurrency contracts also need to implement a `balanceOf` method for the UI to display the user's balance in that contract (also called the subcurrency's wallet).

```
def balanceOf(_addr):
    return(self.balances[_addr].balance)
```


Accounts
-----
* Your SOILcoin address is used as your identity


TODO LIST
---------

### Architecture

- Solidify btc-swap usage, investigate how to apply to cross chain assets
- Implement SchellingCoin-based pegged commodities
- Implement deeper market analysis tools.


### UX/UI

* Graphs, beautiful graphs
* Advanced trading features (stoploss, etc.)
* Wallet design and theming
* Enable category drop downs.


## License

Released under the MIT License, see LICENSE file.
