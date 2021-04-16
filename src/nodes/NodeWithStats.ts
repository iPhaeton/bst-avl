import { Node } from "./Node";
import { INodeWithStats, StatsManager, Tree } from "src/types";

export class NodeWithStats<T, Stats> extends Node<T> implements INodeWithStats<T, Stats> {
    public parent: NodeWithStats<T, Stats> | null;
    public left: NodeWithStats<T, Stats> | null;
    public right: NodeWithStats<T, Stats> | null;
    public stats: Stats;

    constructor(key: number, value: T, private readonly statsManager: StatsManager<T, any, Stats>) {
        super(key, value);
        this.stats = this.statsManager.getDefaultStats();

        this.parent = null;
        this.left = null;
        this.right = null;
    }

    manageStats(tree?: Tree<T>) {
        this.stats = this.statsManager.manageStats(this, tree);
        return this.stats;
    }
}