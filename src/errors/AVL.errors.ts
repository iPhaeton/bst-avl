export class AVLRIError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Object.setPrototypeOf(this, AVLRIError.prototype);
    }
}