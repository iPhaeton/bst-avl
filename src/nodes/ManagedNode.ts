import { Node } from "./Node";
import { IManagedNode, NodeManager, Tree } from "src/types";

export class ManagedNode<T, Stats> extends Node<T> implements IManagedNode<T, Stats> {
    public parent: ManagedNode<T, Stats> | null;
    public left: ManagedNode<T, Stats> | null;
    public right: ManagedNode<T, Stats> | null;
    public stats: Stats;

    constructor(key: number, value: T, private readonly statsManager: NodeManager<ManagedNode<T, any>, Stats>) {
        super(key, value);
        this.stats = this.statsManager.getDefaultStats();

        this.parent = null;
        this.left = null;
        this.right = null;
    }

    manage(tree?: Tree<T>) {
        this.stats = this.statsManager.manage(this, tree);
        return this.stats;
    }
}