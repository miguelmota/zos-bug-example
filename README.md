zos bug example

> [ZepellinOS] bug report ([issue #]())

## Instructions

Install dependencies

```bash
npm install
```

Start ganache

```bash
ganache-cli --deterministic
```

Build contracts

```bash
truffle build
```

Push logic contracts

```bash
npx zos push --network=local
```

Deploy proxies

```bash
npx zos create Example --init initialize --args [0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1],1 --network=local
```

Run bug recreation script

```bash
node scripts/debug.js
```

## License

MIT
