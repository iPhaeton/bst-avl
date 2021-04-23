import { IncrementSize, DecrementSize } from 'src/decorators/size';
import { Node } from 'src/nodes/Node';
import { ChildSide } from 'src/types';
import { getOppositeSide } from 'src/utils';

export class BST<T> {
    public root: Node<T> | null = null;
    public size: number = 0;

    private appendOrReturnChild(parent: Node<T>, child: Node<T>, side: ChildSide) {
        if (parent[side] === null) {
            parent[side] = child;
            child.parent = parent;
            return null;
        } else {
            return parent[side];
        }
    }

    private getH(node: Node<any> | null): number {
        if (node === null) {
            return 0;
        } else {
            const leftH = 1 + this.getH(node.left);
            const rightH = 1 + this.getH(node.right);
            return Math.max(leftH, rightH);
        }
    }

    private getExtremum(node: Node<T> | null, side: ChildSide) {
        while (node !== null) {
            if (node[side] === null) {
                return node;
            } else {
                node = node[side];
            }
        }
        return node;
    }

    private getNextBySide(node: Node<T>, side: ChildSide) {
        if (node[side]) {
            return this.getExtremum(node[side], getOppositeSide(side));
        } else {
            let currentParent = node.parent;
            while (currentParent && node === currentParent[side]) {
                node = currentParent;
                currentParent = node.parent;
            }
            return currentParent;
        }
    }

    private getChildSide(node: Node<T>): ChildSide {
        if (!node.parent) throw Error(`[BST.getChildSide]. Node ${node.key} has no parent`);

        if (node.parent.left === node) {
            return 'left';
        } else {
            return 'right';
        }
    }

    private transplant(node1: Node<T>, node2: Node<T> | null) {
        if (node1.parent === null) {
            this.root = node2;
        } else if (this.getChildSide(node1) === 'left') {
            node1.parent.left = node2;
        } else {
            node1.parent.right = node2;
        }

        if (node2 !== null) {
            if (node2.parent) {
                if (this.getChildSide(node2) === 'left') {
                    node2.parent.left = null;
                } else {
                    node2.parent.right = null;
                }
            }

            node2.parent = node1.parent;

            if (node2 !== node1.left) {
                node2.left = node1.left;
                if (node2.left) {
                    node2.left.parent = node2;
                }
            }
            if (node2 !== node1.right) {
                node2.right = node1.right;
                if (node2.right) {
                    node2.right.parent = node2;
                }
            }
        }
    }

    get h() {
        return this.getH(this.root);
    }

    @IncrementSize
    insert(node: Node<T>, verbose: boolean = false) {
        if (this.root === null) {
            this.root = node;
            return node;
        }

        let currentNode: Node<T> | null = this.root;
        while (currentNode !== null) {
            verbose && console.log(currentNode.key, node.key);
            if (node.key < currentNode.key) {
                verbose && console.log('left');
                currentNode = this.appendOrReturnChild(currentNode, node, 'left');
            } else {
                verbose && console.log('right');
                currentNode = this.appendOrReturnChild(currentNode, node, 'right');
            }
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

    min(node: Node<T> | null) {
        return this.getExtremum(node, 'left');
    }

    max(node: Node<T> | null) {
        return this.getExtremum(node, 'right');
    }

    successor(node: Node<T>) {
        return this.getNextBySide(node, 'right');
    }

    predecessor(node: Node<T>) {
        return this.getNextBySide(node, 'left');
    }

    @DecrementSize
    delete(node: Node<T>) {
        if (!node.left) {
            this.transplant(node, node.right);
        } else if (!node.right) {
            this.transplant(node, node.left);
        } else {
            const successor = this.successor(node);
            this.transplant(node, successor);
        }
    }

    _checkRI(): boolean {
        this.root?._checkRI([], []);
        return true;
    }
}
