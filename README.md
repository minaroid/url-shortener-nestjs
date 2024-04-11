# URL Shortener NestJS

This is a URL shortener application built with NestJS, using DynamoDB for storing URL mappings and S3 for storing QR codes.

## Setup

1. Clone the repository:

```bash
git clone https://github.com/minaroid/url-shortener-nestjs.git
```

2. Install dependencies:

```bash
cd url-shortener-nestjs
npm install
```

3. Configure AWS credentials and environment variables:

Copy the .env.example file to .env and update the AWS credentials and other configuration settings as needed.


## Usage

Running the application locally using npm 

```bash
npm run start:dev 
```

Running the application locally using docker 

```bash
npm run docker:compose:up 
```