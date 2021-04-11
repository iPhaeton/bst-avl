export class Node<T> {
    public parent: Node<T> | null;
    public left: Node<T> | null;
    public right: Node<T> | null;

    constructor(
        public readonly key: number,
        private readonly value: T,
    ) {
        this.parent = null;
        this.left = null;
        this.right = null;
    };

    map() {
        return this.value;
    }

    _checkRI() {
        if (this.left) {
            if (this.left.key > this.key) throw new Error(`Representation invariant failed at node ${this.key}. Left child has key ${this.left.key}`);
            if (this.left.parent !== this) throw new Error(`Representation invariant failed at node ${this.key}. Left child has a wrong parent.`)
            this.left._checkRI();
        }

        if (this.right) {
            if (this.right.key < this.key) throw new Error(`Representation invariant failed at node ${this.key}. Right child has key ${this.right.key}`)
            if (this.right.parent !== this) throw new Error(`Representation invariant failed at node ${this.key}. Right child has a wrong parent.`)
            this.right._checkRI();
        }

        return true;
    }
}