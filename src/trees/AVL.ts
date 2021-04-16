import { ManageStats } from 'src/decorators/stats';
import { ManagedNode } from 'src/nodes/ManagedNode';
import { HeightStats } from 'src/types';
import { BST } from './BST';

export class AVL<T> extends BST<T> {
    @ManageStats<T, HeightStats>()
    insert(node: ManagedNode<T, HeightStats>) {
        const res = super.insert(node);
        return res;
    }
}