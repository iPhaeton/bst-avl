import { Node } from './Node';

export class BST<T> {
    public root: Node<T> | null = null;
    public size: number = 0;

    private appendOrReturnChild(parent: Node<T>, child: Node<T>, side: 'left' | 'right') {
        if (parent[side] === null) {
            parent[side] = child;
            child.parent = parent;
            return null;
        } else {
            return parent[side];
        }
    };

    private getH(node: Node<any> | null): number {
        if (node === null) {
            return 0;
        } else {
            const leftH = 1 + this.getH(node.left);
            const rightH = 1 + this.getH(node.right);
            return Math.max(leftH, rightH);
        }
    };

    get h() {
        return this.getH(this.root);
    }

    insert(node: Node<T>, verbose: boolean = false) {
        this.size++;

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

        return node;
    }

    find(key: number) {
        let currentNode: Node<T> | null = this.root;

        while (currentNode !== null && currentNode.key !== key) {
            if (key < currentNode.key) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        return currentNode;
    }

    successor(node: Node<T>) {
        if (node.right) {
            return node.right;
        } else {
            let currentParent = node.parent;
            while (currentParent && node === currentParent.right) {
                node = currentParent;
                currentParent = node.parent;
            }
            return currentParent;
        }
    }

    _checkRI() {
        this.root?._checkRI([], []);
        return true;
    }
}