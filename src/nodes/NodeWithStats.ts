import { Node } from "./Node";
import { StatsManager } from "src/types";

export class NodeWithStats<T, Stats> extends Node<T> {
    public parent: NodeWithStats<T, Stats> | null;
    public left: NodeWithStats<T, Stats> | null;
    public right: NodeWithStats<T, Stats> | null;
    public stats: Stats;

    constructor(key: number, value: T, private readonly statsManager: StatsManager<T, Stats>) {
        super(key, value);
        this.stats = this.statsManager.getDefaultStats();
        
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    manageStats() {
        this.stats = this.statsManager.manageStats(this);
    }
}