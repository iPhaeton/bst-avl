import { BalanceManager } from "src/managers/BalanceManager";
import { Composition } from "src/managers/Composition";
import { HeightManager } from "src/managers/HeightManager";
import { HeightStats } from "src/types";
import { getNodeHeight } from "src/utils";
import { ManagedNode } from "./ManagedNode";

export class AVLNode<T> extends ManagedNode<T, HeightStats> {
    public parent: AVLNode<T> | null;
    public left: AVLNode<T> | null;
    public right: AVLNode<T> | null;

    constructor(key: number, value: T) {
        const heightManager = new HeightManager<T>();
        const balanceManager = new BalanceManager<T>();
        const manager = new Composition(heightManager, balanceManager, heightManager);

        super(key, value, manager);

        this.parent = null;
        this.left = null;
        this.right = null;
    }

    _checkAVLRI(): boolean {
        return Math.abs(getNodeHeight(this.left) - getNodeHeight(this.right)) <= 1 &&
            (!this.left || this.left._checkAVLRI()) &&
            (!this.right || this.right._checkAVLRI());
    }
}