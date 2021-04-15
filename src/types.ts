import { Node } from "./nodes/Node";
import { NodeWithStats } from "./nodes/NodeWithStats";

export interface Tree<T> {
    root: Node<T> | null;
    h: number;
    size: number;
}

export interface PlotterInterface<Tree> {
    plot: (tree: Tree) => void;
};

export type ChildSide = 'left' | 'right';

export interface StatsManager<T, Stats> {
    getDefaultStats: () => Stats;
    manageStats: (node: NodeWithStats<T, Stats>, tree?: Tree<T>) => Stats;
}

export interface HeightStats {
    h: number;
}

export interface INodeWithStats<T, Stats> extends Node<T> {
    parent: NodeWithStats<T, Stats> | null;
    left: NodeWithStats<T, Stats> | null;
    right: NodeWithStats<T, Stats> | null;
    stats: Stats;
    manageStats: (tree?: Tree<T>) => Stats;
}