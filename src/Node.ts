export class Node<T> {
    constructor(
        public readonly key: number,
        private readonly value: T,
    ) {
        this.parent = null;
        this.left = null;
        this.right = null;
    };

    set parent(v: Node<T> | null) {
        this.parent = v;
    }

    get parent() {
        return this.parent;
    }

    set left(v: Node<T> | null) {
        this.left = v;
    }

    get left() {
        return this.left;
    }

    set right(v: Node<T> | null) {
        this.right = v;
    }

    get right() {
        return this.right;
    }

    map() {
        return this.value;
    }
}