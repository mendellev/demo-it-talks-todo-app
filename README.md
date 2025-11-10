## Pre-reequisites
- Node.js
- Yarn
- Sqlite3 (create todo.db file in ../db/tododb)

## Initial Migration
```
yarn migration:run
```

## Development

```
yarn
yarn start:dev
```

## Migrations

```
yarn migration:create migrations/<name>
```
```
yarn migration:run
```

## Build

```
yarn
yarn build
yarn start:prod
```
