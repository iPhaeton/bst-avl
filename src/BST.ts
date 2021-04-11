import { Node } from './Node';

export class BST<T> {
    private root: Node<T> | null = null;

    constructor() { };

    insert(node: Node<T>) {
        let currentNode = this.root;
        while (currentNode !== null) {
            if (node.key < currentNode.key) {
                currentNode = this.appendOrReturnChild(currentNode, node, 'left');
            } else {
                currentNode = this.appendOrReturnChild(currentNode, node, 'right');
            };
        }

        return node;
    }

    private appendOrReturnChild(parent: Node<T>, child: Node<T>, side: 'left' | 'right') {
        if (parent[side] === null) {
            parent[side] = child;
            child.parent = parent;
            return null;
        } else {
            return parent.left;
        }
    };

    // plot(nodes: Node<T>[]) {
    //     const children = [];
    //     nodes.forEach(node => console.log(`   ${node.key}   `))
    // }
}