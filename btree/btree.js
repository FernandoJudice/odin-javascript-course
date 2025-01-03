function Node(value,left = null,right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
}


function Tree(array) {
    
    const arr = array.sort(function(a, b){return a - b}).filter(function(item, index, arr) {
        return index === 0 || item != arr[index - 1];
    });

    this.buildTree = (array, start, end) => {
        if (end < start) {
            return null
        }
        const midpoint = Math.floor((end-start)/2 + start)
        const left = this.buildTree(array,start,midpoint-1)
        const right = this.buildTree(array,midpoint+1,end)

        return new Node(array[midpoint],left,right)
    };

    this.root = this.buildTree(arr,0,arr.length-1);

    this.insert = (value) => {
        function _insert(value,node) {
            if (!node) {
                return new Node(value)
            }
            if (value === node.value) {
                return node
            }

            if (value < node.value) {
                node.left = _insert(value,node.left)
            } else {
                node.right = _insert(value,node.right)
            }

            return node
        }

        return _insert(value,this.root)
    }

    this.find = (value) => {
        function _find(value,node) {
            if (!node) {
                return null
            }
            if (node.value === value) {
                return node
            }
            
            if (value < node.value) {
                return _find(value,node.left)
            } else {
                return _find(value,node.right)
            }
        }

        return _find(value,this.root, null)
    }

    this.deleteItem = (value) => {
        function _updateChild(parent,isLeft,newNode = null) {
            if (isLeft) { parent.left = newNode }
            else { parent.right = newNode}
        }

        function _findLeftmost(startNode) {
            if (!startNode.left) {
                return startNode
            } else {
                return _findLeftmost(startNode.left)
            }
        }

        function _deleteItem(value, node, parent, isLeft) {
            
            if (!node) {
                return false
            }
            if (node.value === value) {
                if (!node.left && !node.right) {
                    _updateChild(parent,isLeft)
                } 
                else if (!node.left || !node.right) {
                    if (node.left) {
                        _updateChild(parent,isLeft, node.left)
                    } else {
                        _updateChild(parent,isLeft, node.right)
                    }
                } else {
                    leftmost = _findLeftmost(node.right);
                    const newValue = leftmost.value;
                    _deleteItem(newValue,node.right,node,false);
                    node.value = newValue;
                }
                return true
            }
            
            if (value < node.value) {
                return _deleteItem(value, node.left, node, true)
            } else {
                return _deleteItem(value, node.right, node, false)
            }
        }

        return _deleteItem(value, this.root, null, true)
    }

    this.levelOrder = (callback) => {
        const queue = [this.root];

        function _levelOrder (queue, callback) {  
            const node = queue.shift();
            if (!node) {
                return
            }

            callback(node)
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }

            return _levelOrder(queue,callback);
        }

        _levelOrder(queue,callback);
    }

    this.inOrder = (callback) => {
        function _inOder(node, callback) {
            if (!node) {
                return
            }

            _inOder(node.left,callback)
            callback(node)
            _inOder(node.right,callback)
        }
        _inOder(this.root,callback)
    }

    this.preOrder = (callback) => {
        function _preOder(node, callback) {
            if (!node) {
                return
            }

            callback(node)
            _preOder(node.left,callback)
            _preOder(node.right,callback)
        }
        _preOder(this.root,callback)
    }

    this.postOrder = (callback) => {
        function _postOder(node, callback) {
            if (!node) {
                return
            }

            _postOder(node.left,callback)
            _postOder(node.right,callback)
            callback(node)
        }
        _postOder(this.root,callback)
    }

    this.height = (node) => {
        function _height(node, count) {
            if (!node) {
                return count-1
            }
            const leftCount = _height(node.left,count+1);
            const rightCount = _height(node.right,count+1);

            return leftCount > rightCount ? leftCount:rightCount
        }

        return _height(node,0)
    }

    this.depth = (node) => {
        function _depth(curNode, refNode, count) {
            if (!curNode) {
                return -1
            }
            if (curNode.value === refNode.value) {
                return count
            }
            const leftCount = _depth(curNode.left, refNode, count+1);
            const rightCount = _depth(curNode.right, refNode, count+1);

            return leftCount > rightCount ? leftCount:rightCount
        }

        return _depth(this.root,node,0)
    }

    this.isBalanced = () => {
        function _isBalanced(node,height) {
            if (!node) {
                return true
            }
            const leftHeight = height(node.left);
            const rightHeight = height(node.right);
            const result = Math.abs(leftHeight-rightHeight) <=1;

            if(!result) {
                return result
            }

            return _isBalanced(node.left,height) && _isBalanced(node.right,height)
        }

        return _isBalanced(this.root,this.height)
    }

    this.rebalance = () => {
        const arr = []
        function cb(node) {
            arr.push(node.value)
        }
        this.inOrder(cb)
        this.root = this.buildTree(arr,0,arr.length-1)
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
 

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let tree = new Tree(arr)
// console.log(arr.length)
console.log(tree.root)
tree.deleteItem(23)
tree.insert(7000)
tree.insert(8000)
tree.insert(9000)
console.log(prettyPrint(tree.root))
// console.log(prettyPrint(tree.root))
// tree.postOrder((node) => {console.log(node.value)})
// console.log(tree.depth(tree.find(3)))
tree.rebalance()

console.log(prettyPrint(tree.root))