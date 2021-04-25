import { PlotterInterface, Tree } from './types';
import { Node } from './nodes/Node';
import { getSpaces } from './utils';

export class Plotter<T extends Tree<any>> implements PlotterInterface<T> {
    private plotNodes(nodes: Array<Node<any> | null>, level: number, h: number) {
        const splitLine = getSpaces(2 * Math.pow(2, h - level));

        const { line, children } = nodes.reduce(
            ({ line, children }, node) => {
                node ? children.push(node.left) : children.push(null);
                node ? children.push(node.right) : children.push(null);
                return { line: `${line}${splitLine}${node?.key || ' '}${splitLine}`, children };
            },
            {
                line: '',
                children: [],
            } as { line: string; children: Array<Node<any> | null> },
        );
        // tslint:disable-next-line: no-console
        console.log(line);
        // tslint:disable-next-line: no-console
        console.log('');
        // tslint:disable-next-line: no-console
        console.log('');

        if (children.some((n) => n !== null)) {
            this.plotNodes(children, level + 1, h);
        }
    }

    plot(tree: T) {
        if (tree.root) this.plotNodes([tree.root], 0, tree.h);
    }
}
