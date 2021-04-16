import { NodeWithStats } from "src/nodes/NodeWithStats";
import { HeightStats, StatsManager } from "src/types";
import { getNodeHeight } from "src/utils";

export class HeightManager<T> implements StatsManager<T, HeightStats> {
    getDefaultStats() {
        return { h: 0 };
    };

    manageStats(node: NodeWithStats<T, HeightStats>) {
        return {
            h: Math.max(
                getNodeHeight(node.left),
                getNodeHeight(node.right),
            ) + 1
        };
    }
}