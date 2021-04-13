import { Tree } from "src/types";

export function ChangeSize(changeSizeFn: (size: number) => number) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = target[propertyKey];

        descriptor.value = function (...args: any[]) {
            const result = method.apply(this, args);
            (this as Tree<any>).size = changeSizeFn((this as Tree<any>).size);
            return result;
        }
    }
}

export const IncrementSize = ChangeSize((size: number) => size + 1);
export const DecrementSize = ChangeSize((size: number) => size - 1);