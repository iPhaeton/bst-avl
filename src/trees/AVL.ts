import { ManageStats } from '../decorators/stats';
import { AVLNode } from '../nodes/AVLNode';
import { HeightStats } from '../types';
import { BST } from './BST';

export class AVL<T> extends BST<T> {
    public root: AVLNode<T> | null = null;

    @ManageStats<T, HeightStats>()
    insert(node: AVLNode<T>) {
        const res = super.insert(node);
        return res;
    }

    _checkAVLRI() {
        return this._checkRI() && this.root?._checkAVLRI();
    }
}
