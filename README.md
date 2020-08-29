# Example App to my "CQRS / EventSourcing" Talk

## Content

This Example API provides an EventSourced approach to create and manage BankAccounts with different write- and read operations. 

### It shows how ...

- ... to write operations with Events looks like
- ... you can create persistent readModels for performant read operations
- ... to execute business logic with the CRQRS pattern
- ... to implement this architectural Pattern could be implemented with NodeJS and the NestJS Framework using the `fj-event-store`

## Requires

* NodeJS v.12 or above
* Docker or a local PostgreDB