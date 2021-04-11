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
}