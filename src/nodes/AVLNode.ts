import { AVLRIError } from '../errors/AVL.errors';
import { BalanceManager } from '../managers/BalanceManager';
import { Composition } from '../managers/Composition';
import { HeightManager } from '../managers/HeightManager';
import { HeightStats } from '../types';
import { getNodeHeight } from '../utils';
import { ManagedNode } from './ManagedNode';

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
        if (Math.abs(getNodeHeight(this.left) - getNodeHeight(this.right)) <= 1) {
            return (!this.left || this.left._checkAVLRI()) && (!this.right || this.right._checkAVLRI());
        } else {
            throw new AVLRIError(
                `Representation invariant failed at node ${this.key}. Left child height is ${getNodeHeight(
                    this.left,
                )}, right child height is ${getNodeHeight(this.right)}`,
            );
        }
    }
}
