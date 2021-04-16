import { ManageStats } from 'src/decorators/stats';
import { ManagedNode } from 'src/nodes/ManagedNode';
import { HeightStats } from 'src/types';
import { getNodeHeight } from 'src/utils';
import { BST } from './BST';

export class AVL<T> extends BST<T> {
    @ManageStats<T, HeightStats>()
    insert(node: ManagedNode<T, HeightStats>) {
        const res = super.insert(node);
        return res;
    }

    private _checkRIForNode(node: ManagedNode<T, HeightStats> | null): boolean {
        if (!node) return true;

        return Math.abs(getNodeHeight(node.left) - getNodeHeight(node.right)) <= 1 &&
            this._checkRIForNode(node.left) &&
            this._checkRIForNode(node.right);
    }

    _checkRI() {
        return this._checkRIForNode(this.root as ManagedNode<T, HeightStats>); // todo: pass node type as generic parameter to BST
    }
}