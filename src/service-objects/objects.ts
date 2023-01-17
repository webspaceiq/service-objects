/**
 * Represent service invocation information
 */
export interface IExecutionContext<T> {

    /**
     * Service data
     */
    data: T;

    /**
     * Service name
     */
    serviceName: string;
}

/**
 * Instance side of a service executor
 */
export interface IServiceExecutor {

    /**
     * Executes a service.
     * 
     * @param context service lookup and data parameters
     */
    executeService<T, U>(context: IExecutionContext<T>): U
}

/**
 * Constructor interface for IServiceExecutor
 * Static side of a service executor
 */
export interface IServiceExecutorConstructor {

    /**
     * 
     */
    new(...args: any[]): IServiceExecutor; 
}

/**
 * 
 */
export type IServiceContext<T> = Omit<IExecutionContext<T>, 'serviceName'> & {
    serviceExecutor: IServiceExecutor;
};

/**
 * This defines the instance of a service
 */
export interface IService<T, U> {

    /**
     * 
     * @param request 
     */
    execute(context: IServiceContext<T>): U;
}

/**
 * A type alias for IService<any, any> 
 */
export type IServiceInterface = IService<any, any> ;

/**
 * Interface to enable us to
 * reference the stactic side
 * of a serivice
 */
export interface IServiceConstructor {

    /**
     * 
     */
    new(...args: any[]): IServiceInterface; 

    /**
     * Every service class has a static serviceName
     */   
    serviceName: string;
}

/**
 *  Service repository
 */
export interface IServiceRepository {

    /**
     * 
     * @param serviceName 
     */
    get(serviceName: string): IServiceInterface;

    /**
     * 
     * @param serviceName 
     * @param serviceConstructor 
     */
    register(serviceName: string, serviceConstructor: IServiceConstructor): void;
}

/**
 * Constructor interface for IServiceRepository
 * Static side of a service respository
 */
export interface IServiceRepositoryConstructor {

    /**
     * 
     */
    new(...args: any[]): IServiceRepository; 
}


/**
 * Utility interface to describe
 * a service repository entry
 */
export interface ServiceRepositoryEntry {

    /**
     * Service name
     */
    serviceName: string;

    /**
     * Reference to the static side of a service
     */
    serviceContructor: IServiceConstructor;
}
