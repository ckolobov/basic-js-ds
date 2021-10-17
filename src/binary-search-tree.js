const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const node = new Node(data);
    if (this.rootNode) {
      let curNode = this.rootNode;
      while (curNode) {
        if (data > curNode.data) {
          if (curNode.right) {
            curNode = curNode.right
          } else {
            curNode.right = node;
            break;
          }
        } else {
          if (curNode.left) {
            curNode = curNode.left
          } else {
            curNode.left = node;
            break;
          }
        }
      }
    } else {
      this.rootNode = node;
    }
  }

  has(data) {
    return Boolean(this.find(data));
  }

  find(data) {
    let node = this.root();

    while(node) {
      if (data > node.data) {
        node = node.right;
      } else if (data < node.data) {
        node = node.left;
      } else {
        break;
      }
    }

    return node;
  }

  remove(data) {
    const node = this.find(data);
    if (node) {
      const children = [];
      const stack = [node.right, node.left];
      while (stack.length > 0) {
        const curChild = stack.pop();
        if (curChild) {
          children.push(curChild.data);
          stack.push(curChild.right);
          stack.push(curChild.left);
        }
      }

      if (node === this.root()) {
        this.rootNode = null;
      } else {
        let parent = this.root();
        while (parent) {
          if (data > parent.data) {
            if (parent.right.data === data) {
              parent.right = null;
              break;
            } else {
              parent = parent.right;
            }
          } else {
            if (parent.left.data === data) {
              parent.left = null;
              break;
            } else {
              parent = parent.left;
            }
          }
        }
      }

      while (children.length > 0) {
        this.add(children.pop());
      }
    }
  }

  min() {
    let node = this.root();
    while (node.left) {
      node = node.left;
    }
    return node ? node.data : null;
  }

  max() {
    let node = this.root();
    while (node.right) {
      node = node.right;
    }
    return node ? node.data : null;
  }

}