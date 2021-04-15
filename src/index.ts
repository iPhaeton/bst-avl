import { BST } from "./trees/BST";
import { Node } from "./nodes/Node";
import { Plotter } from "./Plotter";
import { AVL } from "./trees/AVL";
import { HeightManager } from "./stats/HeightManager";
import { NodeWithStats } from "./nodes/NodeWithStats";
import { HeightStats } from "./types";
import { BalanceManager } from "./stats/BalanceManager";

const plotter = new Plotter();
const tree = new AVL<number>();
const heightManager = new HeightManager<number>();
const balanceManager = new BalanceManager<number>();

const nodes = [
    new NodeWithStats<number, HeightStats>(15, 15, heightManager),
    new NodeWithStats<number, HeightStats>(10, 10, heightManager),
    new NodeWithStats<number, HeightStats>(20, 20, heightManager),
    new NodeWithStats<number, HeightStats>(12, 12, heightManager),
    new NodeWithStats<number, HeightStats>(14, 14, heightManager),
    new NodeWithStats<number, HeightStats>(8, 8, heightManager),
    new NodeWithStats<number, HeightStats>(7, 7, heightManager),
    new NodeWithStats<number, HeightStats>(9, 9, heightManager),
    new NodeWithStats<number, HeightStats>(17, 17, heightManager),
    new NodeWithStats<number, HeightStats>(22, 22, heightManager),
    new NodeWithStats<number, HeightStats>(16, 16, heightManager),
    new NodeWithStats<number, HeightStats>(21, 21, heightManager),
    new NodeWithStats<number, HeightStats>(23, 23, heightManager),
];

tree.insert(nodes[0]);
tree.insert(nodes[1]);
tree.insert(nodes[2]);
tree.insert(nodes[3]);
tree.insert(nodes[4]);
tree.insert(nodes[5]);
tree.insert(nodes[6]);
tree.insert(nodes[7]);
tree.insert(nodes[8]);
tree.insert(nodes[9]);
tree.insert(nodes[10]);
tree.insert(nodes[11]);
tree.insert(nodes[12]);

plotter.plot(tree);

console.log('-----------------------------------------------------------------------------------------')
balanceManager['rotateLeft'](nodes[0], tree);
plotter.plot(tree);