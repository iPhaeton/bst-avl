import { ManageStats } from 'src/decorators/stats';
import { NodeWithStats } from 'src/nodes/NodeWithStats';
import { HeightStats } from 'src/types';
import { BST } from './BST';

export class AVL<T> extends BST<T> {
    @ManageStats<T, HeightStats>()
    insert(node: NodeWithStats<T, HeightStats>) {
        const res = super.insert(node);
        return res;
    }
}