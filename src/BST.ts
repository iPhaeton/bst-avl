import { Node } from './Node';
import { Plotter } from './Plotter';

export class BST<T> {
    public root: Node<T> | null = null;
    public size: number = 0;

    constructor(private readonly plotter: Plotter<BST<T>> = new Plotter()) { };

    private appendOrReturnChild(parent: Node<T>, child: Node<T>, side: 'left' | 'right') {
        if (parent[side] === null) {
            parent[side] = child;
            child.parent = parent;
            return null;
        } else {
            return parent[side];
        }
    };

    insert(node: Node<T>, verbose: boolean = false) {
        if (this.root === null) {
            this.root = node;
            return node;
        }

        let currentNode: Node<T> | null = this.root;
        while (currentNode !== null) {
            verbose && console.log(currentNode.key, node.key)
            if (node.key < currentNode.key) {
                verbose && console.log('left');
                currentNode = this.appendOrReturnChild(currentNode, node, 'left');
            } else {
                verbose && console.log('right');
                currentNode = this.appendOrReturnChild(currentNode, node, 'right');
            };
        }

        this.size++;
        return node;
    }

    plot() {
        this.plotter.plot(this);
    }

    _checkRI() {
        this.root?._checkRI();
        return true;
    }
}