# Service Objects
> A small TypeScript library for defining, looking up and executing user defined service objects.


A service is a user defined class that implements the IService interface.

```typescript
export interface IService<T, U> {

    execute(context: IServiceContext<T>): U;
}
```

Additionally a service has a constructor interface.

```typescript
export interface IServiceConstructor {

    new(...args: any[]): IServiceInterface; 

    /**
     * Every service class has a static 
     * serviceName property
     */   
    serviceName: string;
}
```
This library defines an API for creating, storing, looking up and executing services. This is achieved with the help of service executors, service repositories and decorators.

```typescript
import { IExecutionContext, IServiceInterface, IServiceConstructor } from "@alstradocs/service-objects";

export interface IServiceExecutor {

    executeService<T, U>(context: IExecutionContext<T>): U
}

export interface IServiceRepository {

    get(serviceName: string): IServiceInterface;

    register(serviceName: string, serviceConstructor: IServiceConstructor): void;
}
```

## Installation

NPM:

```sh
npm install @alstradocs/service-objects --save
```

## Usage example

### 1. Define Services
First you need a service. You can simply annotate a class with the @IsService decorator.

```typescript
import { IsService, IServiceContext } from "@alstradocs/service-objects";

interface BinaryOperands {
    firstOperand: number;
    secondOperand: number;
}

@IsService()
class AdditionService {

    public static serviceName = 'AdditionService';

    execute(context: IServiceContext<BinaryOperands>): number {
        let { firstOperand, secondOperand } = context.data;
        return firstOperand + secondOperand;
    }
}
```
### 2. Instantiate/Define Service Repository 
Next you add your shining new service to an instance of IServiceRepository. A service repository is just a fancy name for a service store. You can use the default repository 
```typescript
import { ServiceRepository } from "@alstradocs/service-objects";

// Initialize service repo with just a single service ...
let serviceInfo = { 
        serviceName:AdditionService.serviceName, 
        serviceContructor: AdditionService 
};
let repository = new ServiceRepository([serviceInfo]);

// ... or add to existing repo
repository.register(AdditionService.serviceName, AdditionService);
```
Or you can implement your own repository 

```typescript
import { IsServiceRepository, IServiceConstructor } from "@alstradocs/service-objects";

@IsServiceRepository()
export class MyServiceRepository {

    get(serviceName: string): IServiceInterface {
        ...
    }

    register(serviceName: string, serviceConstructor: IServiceConstructor): void {
        ...
    }
}
// ... Instantiate repo and add service
let repository = new MyServiceRepository();
repository.register(AdditionService.serviceName, AdditionService);
```

### 3. Define/Instanstiate A Service Execcutor
To execute your service, you need an instance of IServiceExecutor. The service executor is a object that knows how to find and execute services. It uses the service repository for this. You can use the default executor.

```typescript
import { ServiceRepository } from "@alstradocs/service-objects";

let repository = // initialize repo
// instantiate executor with given repo
let serviceExecutor = new ServiceExecutor(repository);
```
Or you can implement your own executor 

```typescript
import { IsServiceExecutor, IExecutionContext } from "@alstradocs/service-objects";

@IsServiceExecutor()
export class MyServiceExecutor {
    
    executeService<T, U>(context: IExecutionContext<T>): U {
        ...
    }
}
// ... instantiate and execute (context contains all info required to execute a service)
let serviceExecutor = new MyServiceExecutor();
```
### 4. Execute Service
The final step is executing the service.
```typescript
serviceExecutor.executeService(context);
```

Typically all the entire setup above (apart from step 4) will be done once before or during app/script inititialization. You can then store the executor app/script wide and
make it available to execute services as needed.

_For more examples and usage, please refer to the source code._

## Release History

* 1.0.0
    * Work in progress

## Meta

Edward Banfa – [@EdwardBanfa](https://twitter.com/edwardbanfa) – ebanfa@gmail.com

Distributed under the Apache license. See ``LICENSE`` for more information.

[https://github.com/alstradocs/service-objects](https://github.com/alstradocs/)

## Readme Image
<a href='https://pngtree.com/so/robot-clipart'>robot clipart png from pngtree.com</a>
<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/@alstradocs/service-objects
[npm-url]: https://npmjs.org/package/@alstradocs/service-objects
[npm-downloads]: https://img.shields.io/npm/dw/@alstradocs/service-objects
[wiki]: https://github.com/yourname/yourproject/wiki
