import { Node } from './Node';

export class BST<T> {
    private root: Node<T> | null = null;

    constructor() { };

    insert(node: Node<T>) {
        if (this.root === null) {
            this.root = node;
            return node;
        }

        let currentNode: Node<T> | null = this.root;
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

    plot() {
        this.root && this.plotNodes([this.root]);
    }

    private plotNodes(nodes: Node<T>[]) {
        const line1 = nodes.reduce((line, node) => `${line}   ${node.key}   `, '');
        console.log(line1);
        const { line: line2, children } = nodes.reduce(({ line, children }, node) => {
            node.left && children.push(node.left);
            node.right && children.push(node.right);
            return { line: `${line}   / \\   `, children };
        }, { line: '', children: [] } as { line: string, children: Node<T>[] });
        console.log(line2);

        if (children.length) {
            this.plotNodes(children);
        }
    }
}