import { NodeWithStats } from 'src/nodes/NodeWithStats';

export function ManageStats<T, Stats>() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = target[propertyKey];

        descriptor.value = function (node: NodeWithStats<T, Stats> | null) {
            const result = method.apply(this, node);

            while (node) {
                node.manageStats();
                node = node.parent;
            }

            return result;
        }
    }
}