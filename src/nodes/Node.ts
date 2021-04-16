export class Node<T> {
    public parent: Node<T> | null;
    public left: Node<T> | null;
    public right: Node<T> | null;

    constructor(
        public readonly key: number,
        public readonly value: T,
    ) {
        this.parent = null;
        this.left = null;
        this.right = null;
    };

    // todo: return "false" instead of throwing an error
    _checkRI(ancestors: Node<T>[], successorrs: Node<T>[]): boolean {
        if (this.left && this.left.parent !== this) {
            throw new Error(`Representation invariant failed at node ${this.key}. Left child has a wrong parent.`);
        }

        if (this.right && this.right.parent !== this) {
            throw new Error(`Representation invariant failed at node ${this.key}. Right child has a wrong parent.`);
        }

        const ancesorVilotion = ancestors.find(a => a.key > this.key);
        if (ancesorVilotion) {
            throw new Error(`Representation invariant failed at node ${this.key}. An ancestor has key ${ancesorVilotion.key}`);
        }

        const successorViolation = successorrs.find(s => s.key < this.key);
        if (successorViolation) {
            throw new Error(`Representation invariant failed at node ${this.key}. A successor has key ${successorViolation.key}`);
        }

        return (this.left === null || this.left._checkRI(ancestors, [...successorrs, this])) &&
            (this.right === null || this.right?._checkRI([...ancestors, this], successorrs));
    }
}