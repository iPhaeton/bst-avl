import { Tree } from "src/interfaces";

export function IncrementSize() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = target[propertyKey];

        descriptor.value = function (...args: any[]) {
            const result = method.apply(this, args);
            (this as Tree<any>).size++;
            return result;
        }
    }
}