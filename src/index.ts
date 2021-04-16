import { Plotter } from "./Plotter";
import { AVL } from "./trees/AVL";
import { HeightManager } from "./managers/HeightManager";
import { ManagedNode } from "./nodes/ManagedNode";
import { HeightStats } from "./types";
import { BalanceManager } from "./managers/BalanceManager";
import { Composition } from "./managers/Composition";
import { AVLNode } from "./nodes/AVLNode";

const plotter = new Plotter();
const tree = new AVL<number>();

const nodes = [
    new AVLNode(1, 1),
    new AVLNode(10, 10),
    new AVLNode(20, 20),
    new AVLNode(25, 25),
    new AVLNode(30, 30),
    new AVLNode(35, 35),
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
console.log(tree._checkAVLRI());