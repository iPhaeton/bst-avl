import { ChildSide, HeightStats, NodeManager, Tree } from 'src/types';
import { getNodeHeight, getOppositeSide } from 'src/utils';
import { ManagedNode } from '../nodes/ManagedNode';

export class BalanceManager<T> implements NodeManager<ManagedNode<T, HeightStats>, {}> {
    private rotate(node: ManagedNode<T, HeightStats>, tree: Tree<T>, side: ChildSide) {
        const oppositeSide = getOppositeSide(side);
        const A = node[oppositeSide];
        if (A === null) return;

        if (node.parent !== null) {
            if (node === node.parent.left) {
                node.parent.left = A;
            } else {
                node.parent.right = A;
            }
        } else {
            tree.root = A;
        }
        A.parent = node.parent;
        node.parent = A;
        node[oppositeSide] = A[side];
        A[side] = node;

        const child = node[oppositeSide];
        if (child !== null) {
            child.parent = node;
        }
    }

    private rotateRight(node: ManagedNode<T, HeightStats> | null, tree?: Tree<T>) {
        if (!node || !tree) return;
        return this.rotate(node, tree, 'right');
    }

    private rotateLeft(node: ManagedNode<T, HeightStats> | null, tree?: Tree<T>) {
        if (!node || !tree) return;
        return this.rotate(node, tree, 'left');
    }

    getDefaultStats() {
        return {};
    }

    manage(node: ManagedNode<T, HeightStats>, tree?: Tree<T>) {
        const leftHeight = getNodeHeight(node.left);
        const rightHeight = getNodeHeight(node.right);

        if (leftHeight - rightHeight > 1) {
            if (getNodeHeight(node.left?.left || null) >= getNodeHeight(node.left?.right || null)) {
                this.rotateRight(node, tree);
            } else {
                this.rotateLeft(node.left, tree);
                this.rotateRight(node, tree);
            }
        } else if (rightHeight - leftHeight > 1) {
            if (getNodeHeight(node.right?.right || null) >= getNodeHeight(node.right?.left || null)) {
                this.rotateLeft(node, tree);
            } else {
                this.rotateRight(node.right, tree);
                this.rotateLeft(node, tree);
            }
        }
        return {};
    }
}
