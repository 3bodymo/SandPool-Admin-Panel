# SandPool

![](https://github.com/3bodymo/SandPool-Admin-Panel/blob/main/client/src/static/images/screenshot.png)

The Admin Panel is an essential component of our NFT marketplace project. It serves as a powerful tool for managing the results of the AI model that detects and classifies NSFW (Not Safe for Work) NFTs listed on our platform. With the Admin Panel, administrators have the ability to review and take necessary actions based on the AI model's results.

## Requirements

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

## Setup - Client

```shell
git clone https://github.com/3bodymo/SandPool-Admin-Panel.git
cd client
npm install
yarn global add ganache-cli
```

## Setup - Server

```shell
cd server
npm install
yarn global add ganache-cli
```

_Make sure to install MongoDB using the provided link:_
[MongoDB installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

## Getting Started

_Before getting started, make sure that you change `DATABASE_URL` with your database hostname in .env file (server)_

```shell
ganache-cli -d --db /path -i 4447
sudo systemctl start mongod
npm start
```

Visit this URL in your browser: http://localhost:3001
