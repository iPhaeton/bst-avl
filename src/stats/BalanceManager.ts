import { ChildSide, HeightStats, StatsManager, Tree } from "src/types";
import { getOppositeSide } from "src/utils";
import { NodeWithStats } from "../nodes/NodeWithStats";

export class BalanceManager<T> implements StatsManager<T, {}> {
    private rotate(node: NodeWithStats<T, HeightStats>, tree: Tree<T>, side: ChildSide) {
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

        const child = node[oppositeSide]
        if (child !== null) {
            child.parent = node;
        }
    };

    private rotateRight(node: NodeWithStats<T, HeightStats>, tree: Tree<T>) {
        return this.rotate(node, tree, 'right');
    }

    private rotateLeft(node: NodeWithStats<T, HeightStats>, tree: Tree<T>) {
        return this.rotate(node, tree, 'left');
    }

    getDefaultStats() {
        return {};
    }

    manageStats(node: NodeWithStats<T, {}>, tree?: Tree<T>) {
        return {};
    }
}