import { ManagedNode } from '../nodes/ManagedNode';
import { Tree } from '../types';

export function ManageStats<T, Stats>() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = target[propertyKey];

        descriptor.value = function (node: ManagedNode<T, Stats> | null) {
            const result = method.apply(this, [node]);

            while (node) {
                node.manage(this as Tree<T>);
                node = node.parent;
            }

            return result;
        };
    };
}
