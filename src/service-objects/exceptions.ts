/**
 * 
 */
export class ServiceException extends Error {
    
    /**
     * 
     * @param message 
     */
    constructor(message: any) {
        super(message);
        Object.setPrototypeOf(this, ServiceException.prototype);
    }
}

/**
 * 
 */
export class ServiceNotFoundException extends ServiceException {

    /**
     * 
     * @param message 
     */
    constructor(message: any) {
        super(message);
        Object.setPrototypeOf(this, ServiceNotFoundException.prototype);
    }
}