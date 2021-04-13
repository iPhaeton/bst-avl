import { Node } from "./Node";

export interface Tree<T> {
    root: Node<T> | null;
    h: number;
    size: number;
}

export interface PlotterInterface<Tree> {
    plot: (tree: Tree) => void;
};

export type ChildSide = 'left' | 'right';