import { PlotterInterface, Tree } from "src/interfaces";
import { Node } from "src/Node";
import { getH, getSpaces } from "./utils";

export class Plotter<T extends Tree<any>> implements PlotterInterface<T> {
    private plotNodes(nodes: Array<Node<any> | null>, level: number, h: number) {
        // console.log(nodes.map(n => n?.map()));
        const splitLine = getSpaces(1 * Math.pow(2, h - level));

        const line1 = nodes.reduce((line, node) => `${line}${splitLine}${node?.key || ''}   `, '');
        console.log(line1);
        const { line: line2, children } = nodes.reduce(({ line, children }, node) => {
            node && children.push(node.left);
            node && children.push(node.right);
            return { line: `${line}   / \\   `, children };
        }, { line: '', children: [] } as { line: string, children: Array<Node<any> | null> });

        if (children.length) {
            this.plotNodes(children, level + 1, h);
        }
    }

    plot(tree: T) {
        const h = getH(tree.root);
        tree.root && this.plotNodes([tree.root], 0, h);
    }
}