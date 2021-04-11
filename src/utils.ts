import { Node } from "./Node";

export const getH = (node: Node<any> | null): number => {
    if (node === null) {
        return 0;
    } else {
        const leftH = 1 + getH(node.left);
        const rightH = 1 + getH(node.right);
        return Math.max(leftH, rightH);
    }
};
