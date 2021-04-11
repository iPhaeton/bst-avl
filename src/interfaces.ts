import { Node } from "./Node";

export interface Tree<T> {
    root: Node<T> | null;
}

export interface PlotterInterface<Tree> {
    plot: (tree: Tree) => void;
};