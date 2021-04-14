import { Node } from "./Node";
import { StatsManager } from "src/types";

export class NodeWithStats<T, Stats> extends Node<T> {
    public stats: Stats;

    constructor(key: number, value: T, private readonly statsManager: StatsManager<T, Stats>) {
        super(key, value);
        this.stats = this.statsManager.getDefaultStats();
    }

    manageStats() {
        this.stats = this.statsManager.manageStats(this);
    }
}