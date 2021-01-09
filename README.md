# Example App to my "CQRS / EventSourcing" Talk

## Content

This Example API provides an EventSourced approach to create and manage BankAccounts with different write- and read operations. 

### It shows how ...

- ... to write operations with Events looks like
- ... you can create persistent ReadModels for performant read operations
- ... to execute business logic with the CQRS pattern
- ... this architectural Pattern could be implemented with NodeJS and the NestJS Framework using the `fj-event-store`

## Requires

* NodeJS v.12 or above
* Docker or a local PostgreSQL DB

## Getting started

Run this App with Docker

* `docker-compose up -d`

Run this App locally

* Start your PostgreSQL DB and configure your Connection in an `.env` File. Use `.env.example` as template.
    * You can start an DB Server with Docker using `docker-compose up -d postgres`

* Install dependencies with `npm install`
* Start the App with `npm run start:dev`
* The App UI is available at `http://localhost:3000/`

## Try id out

All API Endpoint are available in the SwaggerUI
