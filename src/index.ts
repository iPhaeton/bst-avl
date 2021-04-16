import { Plotter } from "./Plotter";
import { AVL } from "./trees/AVL";
import { HeightManager } from "./stats/HeightManager";
import { ManagedNode } from "./nodes/ManagedNode";
import { HeightStats } from "./types";
import { BalanceManager } from "./stats/BalanceManager";

const plotter = new Plotter();
const tree = new AVL<number>();
const heightManager = new HeightManager<number>();
const balanceManager = new BalanceManager<number>();

const nodes = [
    new ManagedNode<number, HeightStats>(15, 15, heightManager),
    new ManagedNode<number, HeightStats>(10, 10, heightManager),
    new ManagedNode<number, HeightStats>(20, 20, heightManager),
    new ManagedNode<number, HeightStats>(5, 5, heightManager),
    new ManagedNode<number, HeightStats>(7, 7, heightManager),
];

tree.insert(nodes[0]);
tree.insert(nodes[1]);
tree.insert(nodes[2]);
tree.insert(nodes[3]);
tree.insert(nodes[4]);

plotter.plot(tree);

console.log('-----------------------------------------------------------------------------------------')
balanceManager.manage(nodes[1], tree);
plotter.plot(tree);