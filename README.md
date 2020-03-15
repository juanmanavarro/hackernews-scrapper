# Hackernews scrapper

## Setup

0. Prerequisites

- Node
- npm

1. Clone this repo

```bash
git clone https://github.com/juanmanavarro/hackernews-scrapper.git
```

2. Install dependencies

```bash
cd hackernews-scrapper
npm install
```

3. Run migrations

```bash
node ace migration:run
```

## Usage

0. Prerequisites

- CURL installed

1. Serve the app

```bash
npm start
```

2. Run tests

```bash
node ace test
```

3. Execute this command

Replace __{page}__ with the page number you want to request. If no page number is setted, page 1 is requested.

```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3333/{page}
```
