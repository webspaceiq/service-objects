import { ServiceNotFoundException } from "./exceptions";
import { IsServiceExecutor, IsServiceRepository } from "./decorators";
import { 
    IServiceRepository, IServiceConstructor, IServiceContext, 
    IExecutionContext, IServiceInterface, ServiceRepositoryEntry}  from "./objects";

/**
 * 
 */
@IsServiceExecutor()
export class ServiceExecutor {
    
    /**
     * 
     * @param repository 
     */
    constructor(private repository: IServiceRepository) {
    }

    /**
     * 
     * @param context 
     */
    executeService<T, U>(context: IExecutionContext<T>): U {
        let businessService: IServiceInterface = this.repository.get(context.serviceName);
        let serviceContext: IServiceContext<T> = { ...context, serviceExecutor: this };
        return businessService.execute(serviceContext);
    }
}

/**
 * 
 */
@IsServiceRepository()
export class ServiceRepository {

    /**
     * 
     */
    private services: Map<string, IServiceConstructor>;

    /**
     * 
     * @param entries 
     */
    constructor(entries: ServiceRepositoryEntry[]) { 
        this.services = new Map<string, IServiceConstructor>();
        // Register services
        entries.forEach(entry => {
            this.register(entry.serviceName, entry.serviceContructor)
        });
    }

    /**
     * 
     * @param serviceName 
     */
    get(serviceName: string): IServiceInterface {
        let serviceConstructor = this.services.get(serviceName);
        if(serviceConstructor) {
            let service: IServiceInterface = new serviceConstructor({});
            return service;

        } else { throw new ServiceNotFoundException('Service not found'); };
    }

    /**
     * 
     * @param serviceName 
     * @param serviceClass 
     */
    register(serviceName: string, serviceConstructor: IServiceConstructor): void {
        this.services.set(serviceName, serviceConstructor);
    }
}