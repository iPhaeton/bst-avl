import { NodeWithStats } from "src/nodes/NodeWithStats";
import { HeightStats, StatsManager } from "src/types";

export class HeightManager<T> implements StatsManager<T, HeightStats> {
    getHeight(node: NodeWithStats<T, HeightStats> | null) {
        return node?.stats.h || 0;
    }

    getDefaultStats() {
        return { h: 0 };
    };

    manageStats(node: NodeWithStats<T, HeightStats>) {
        return {
            h: Math.max(
                this.getHeight(node.left),
                this.getHeight(node.right),
            ) + 1
        };
    }
}