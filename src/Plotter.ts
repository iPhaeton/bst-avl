import { PlotterInterface, Tree } from "src/interfaces";
import { Node } from "src/Node";

export class Plotter<T extends Tree<any>> implements PlotterInterface<T> {
    private plotNodes(nodes: Node<any>[]) {
        const line1 = nodes.reduce((line, node) => `${line}   ${node.key}   `, '');
        console.log(line1);
        const { line: line2, children } = nodes.reduce(({ line, children }, node) => {
            node.left && children.push(node.left);
            node.right && children.push(node.right);
            return { line: `${line}   / \\   `, children };
        }, { line: '', children: [] } as { line: string, children: Node<any>[] });
        console.log(line2);

        if (children.length) {
            this.plotNodes(children);
        }
    }

    plot(tree: T) {
        tree.root && this.plotNodes([tree.root]);
    }
}