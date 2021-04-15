import { HeightStats, StatsManager, Tree } from "src/types";
import { NodeWithStats } from "../nodes/NodeWithStats";

export class BalanceManager<T> implements StatsManager<T, {}> {
    private rotateRight(node: NodeWithStats<T, HeightStats>, tree: Tree<T>) {
        if (node.left === null) return;
        const A = node.left;

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
        node.left = A.right;
        A.right = node;

        if (node.left !== null) {
            node.left.parent = node;
        }
    };

    getDefaultStats() {
        return {};
    }

    manageStats(node: NodeWithStats<T, {}>, tree?: Tree<T>) {
        return {};
    }
}