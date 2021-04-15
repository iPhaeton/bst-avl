import { NodeWithStats } from 'src/nodes/NodeWithStats';
import { Tree } from 'src/types';

export function ManageStats<T, Stats>() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = target[propertyKey];

        descriptor.value = function (node: NodeWithStats<T, Stats> | null) {
            const result = method.apply(this, node);

            while (node) {
                node.manageStats(this as Tree<T>);
                node = node.parent;
            }

            return result;
        }
    }
}