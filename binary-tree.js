class EmptyNode {
  hasLeftChild = function () { return false; }
  getLeftChild = function () { return this; }
  hasRightChild = function () { return false; }
  getRightChild = function () { return this; }
  getValue = function () { return undefined; }
}

class Node {
  static emptyNode = new EmptyNode();
  constructor(value) {
    this[0] = Node.emptyNode;
    this[1] = Node.emptyNode;
    this.value = value;
  }
  static getNode(value_or_node) {
    if (typeof value_or_node === "undefined"
      || value_or_node === "null"
      || value_or_node instanceof EmptyNode)
      return Node.emptyNode;
    if (value_or_node instanceof Node) return value_or_node;
    return new Node(value_or_node);
  }
  hasLeftChild() {
    return !(this[0] instanceof EmptyNode);
  }
  getLeftChild() {
    return this[0];
  }
  setLeftChild(value_or_node) {
    this[0] = Node.getNode(value_or_node);
    return this[0];
  }
  hasRightChild() {
    return !(this[1] instanceof EmptyNode);
  }
  getRightChild() {
    return this[1];
  }
  setRightChild(value_or_node) {
    this[1] = Node.getNode(value_or_node);
    return this[1];
  }
  getValue() {
    return this.value;
  }
}

class BinaryTree {
  static EmptyNode = EmptyNode;
  static Node = Node;
  constructor(value_or_node) {
    this.root = Node.getNode(value_or_node);
  }
  static fromArray(array) {
    let iterator = array.values();
    let root = Node.getNode(iterator.next().value);
    let nodeQueue = [root];
    let index = 0;
    while (!iterator.done && index < nodeQueue.length) {
      let node = nodeQueue[index++];
      if (node instanceof EmptyNode) continue;
      nodeQueue.push(node.setLeftChild(iterator.next().value));
      nodeQueue.push(node.setRightChild(iterator.next().value));
    }
    return new BinaryTree(root);
  }
  toArray() {
    let remainingNodes = 1;
    let index = 0;
    let nodeQueue = [this.root];
    while (remainingNodes > 0 && index < nodeQueue.length) {
      let node = nodeQueue[index++];
      nodeQueue.push(node.getLeftChild(), node.getRightChild());
      if (node instanceof Node) remainingNodes--;
      if (node.hasLeftChild()) remainingNodes++;
      if (node.hasRightChild()) remainingNodes++;
    }
    let values = nodeQueue.slice(0, index).map((node) => node.getValue());
    for (let key in values)
      if (typeof values[key] === "undefined") delete values[key];
    return values;
  }
  hasRoot() {
    return !(this.root instanceof EmptyNode);
  }
  getRoot() {
    return this.root;
  }
  setRoot(value_or_node) {
    this.root = Node.getNode(value_or_node);
    return this.root;
  }
}

exports.EmptyNode = EmptyNode;
exports.Node = Node;
exports.BinaryTree = BinaryTree;
