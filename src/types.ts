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
    manageStats: (node: NodeWithStats<T, Stats>) => Stats;
}

export interface HeightStats {
    h: number;
}