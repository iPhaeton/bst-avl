import { ManagedNode } from "src/nodes/ManagedNode";
import { HeightStats, NodeManager } from "src/types";
import { getNodeHeight } from "src/utils";

export class HeightManager<T> implements NodeManager<ManagedNode<T, HeightStats>, HeightStats> {
    getDefaultStats() {
        return { h: 0 };
    };

    manage(node: ManagedNode<T, HeightStats>) {
        return {
            h: Math.max(
                getNodeHeight(node.left),
                getNodeHeight(node.right),
            ) + 1
        };
    }
}