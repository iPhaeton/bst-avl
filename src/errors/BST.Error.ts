export class BSTWrongParentLeftError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Object.setPrototypeOf(this, BSTWrongParentLeftError.prototype);
    }
}

export class BSTWrongParentRightError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Object.setPrototypeOf(this, BSTWrongParentRightError.prototype);
    }
}

export class BSTRIAncestorError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Object.setPrototypeOf(this, BSTRIAncestorError.prototype);
    }
}

export class BSTRISuccessorError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Object.setPrototypeOf(this, BSTRISuccessorError.prototype);
    }
}
