import { Plotter } from "./Plotter";
import { AVL } from "./trees/AVL";
import { HeightManager } from "./managers/HeightManager";
import { ManagedNode } from "./nodes/ManagedNode";
import { HeightStats } from "./types";
import { BalanceManager } from "./managers/BalanceManager";
import { Composition } from "./managers/Composition";

const plotter = new Plotter();
const tree = new AVL<number>();
const heightManager = new HeightManager<number>();
const balanceManager = new BalanceManager<number>();

const manager = new Composition(heightManager, balanceManager, heightManager);

const nodes = [
    new ManagedNode<number, HeightStats>(1, 1, manager),
    new ManagedNode<number, HeightStats>(10, 10, manager),
    new ManagedNode<number, HeightStats>(20, 20, manager),
    new ManagedNode<number, HeightStats>(25, 25, manager),
    new ManagedNode<number, HeightStats>(30, 30, manager),
    new ManagedNode<number, HeightStats>(35, 35, manager),
];

tree.insert(nodes[0]);
tree.insert(nodes[1]);
tree.insert(nodes[2]);
tree.insert(nodes[3]);
tree.insert(nodes[4]);
tree.insert(nodes[5]);

plotter.plot(tree);
console.log(nodes[0].key, nodes[0].stats);
console.log(nodes[1].key, nodes[1].stats);
console.log(nodes[2].key, nodes[2].stats);
console.log(nodes[3].key, nodes[3].stats);
console.log(nodes[4].key, nodes[4].stats);
console.log(nodes[5].key, nodes[5].stats);
console.log(tree._checkRI());