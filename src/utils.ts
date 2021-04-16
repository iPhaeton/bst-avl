import { NodeWithStats } from "./nodes/NodeWithStats";
import { ChildSide, HeightStats } from "./types";

export const getSpaces = (size: number) => {
    let str = '';
    for (let i = 0; i < size; i++) {
        str += ' ';
    }
    return str;
}

export const getOppositeSide = (side: ChildSide) => side === 'left' ? 'right' : 'left';

export const getNodeHeight = <T>(node: NodeWithStats<T, HeightStats> | null) => {
    return node?.stats.h || 0;
}