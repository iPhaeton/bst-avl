import { ManagedNode } from 'src/nodes/ManagedNode';
import { NodeManager, Tree } from 'src/types';

export class Composition<T, Stats> implements NodeManager<ManagedNode<T, Stats>, Stats> {
    private readonly managers: NodeManager<ManagedNode<T, Stats>, any>[];

    constructor(...managers: NodeManager<ManagedNode<T, Stats>, any>[]) {
        this.managers = managers;
    }

    getDefaultStats() {
        return this.managers.reduce((stats, manager) => ({ ...stats, ...manager.getDefaultStats() }), {} as Stats);
    }

    manage(node: ManagedNode<T, Stats>, tree?: Tree<T>) {
        const s = this.managers.map(m => m.manage(node, tree));
        const stats = s.reduce((res, s) => ({...res, ...s}), {});
        return stats;
    }
}