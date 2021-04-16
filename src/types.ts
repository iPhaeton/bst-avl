import { Node } from "./nodes/Node";

export interface Tree<T> {
    root: Node<T> | null;
    h: number;
    size: number;
}

export interface PlotterInterface<Tree> {
    plot: (tree: Tree) => void;
};

export type ChildSide = 'left' | 'right';

export interface NodeManager<N extends Node<any>, Stats> {
    getDefaultStats: () => Stats;
    manage: (node: N, tree?: Tree<N['value']>) => Stats;
}

export interface HeightStats {
    h: number;
}

export interface IManagedNode<T, Stats> extends Node<T> {
    parent: IManagedNode<T, Stats> | null;
    left: IManagedNode<T, Stats> | null;
    right: IManagedNode<T, Stats> | null;
    stats: Stats;
    manage: (tree?: Tree<T>) => Stats;
}