import { PlotterInterface, Tree } from "src/interfaces";
import { Node } from "src/Node";
import { getSpaces } from "./utils";

export class Plotter<T extends Tree<any>> implements PlotterInterface<T> {
    private plotNodes(nodes: Array<Node<any> | null>, level: number, h: number) {
        const splitLine = getSpaces(2 * Math.pow(2, h - level));

        const { line, children } = nodes.reduce(({ line, children }, node) => {
            node ? children.push(node.left) : children.push(null);
            node ? children.push(node.right) : children.push(null);
            return { line: `${line}${splitLine}${node?.key || ' '}${splitLine}`, children };
        }, {
            line: '', children: [],
        } as { line: string, children: Array<Node<any> | null> });
        console.log(line)
        console.log('');
        console.log('');

        if (children.some(n => n !== null)) {
            this.plotNodes(children, level + 1, h);
        }
    }

    plot(tree: T) {
        tree.root && this.plotNodes([tree.root], 0, tree.h);
    }
}