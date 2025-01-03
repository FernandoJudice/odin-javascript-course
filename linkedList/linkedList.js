function LinkedList() {
    this.root = null;
    
    this.append = (value) => {
        const newNode = new Node();
        newNode.value = value;
        if (this.root) {
            this.tail().nextNode = newNode;
        } else {
            this.root = newNode
        }
    }

    this.prepend = (value) => {
        const newNode = new Node();
        newNode.value = value;
        newNode.nextNode = this.root;
        this.root = newNode
    }

    this.size = () => {
        function countNode(node, count) {
            if (!node) {
                return count;
            }    
            return countNode(node.nextNode,++count)
        }    
        return countNode(this.root, 0)
    }    
    
    this.tail = () => {
        function getNext(node) {
            if (node.nextNode === null) {
                return node
            }
            return getNext(node.nextNode)
        }

        if (this.root) {
            return getNext(this.root)
        } else {
            return this.root
        }    
    }    

    this.head = () => {return this.root}

    this.at = (index) => {
        function countNode(node, count, index) {
            if (!node) {
                return null;
            }    
            if (count === index) {
                return node
            }    
            return countNode(node.nextNode,++count, index)
        }    
        return countNode(this.root, 0, index)
    }

    this.pop = () => {
        const newLastNode = this.at(this.size()-2);
        const poppedNode = newLastNode.nextNode;
        newLastNode.nextNode = null;
        return poppedNode
    }

    this.contains = (value) => {
        function containsValue(node, value) {
            if (!node) {return false}
            if (node.value === value) {return true}
            return containsValue(node.nextNode, value)
        }
        return containsValue(this.root, value)
    }

    this.find = (value) => {
        function findValue(node, value, index) {
            if (!node) {return null}
            if (node.value === value) {return index}
            return findValue(node.nextNode, value, ++index)
        }
        return findValue(this.root, value, 0)
    }

    this.insertAt = (value, index) => {
        if (index == 0) {return this.prepend(value)}
        
        const beforeNode = this.at(index-1)
        
        if (!beforeNode) {return}
        
        const newNode = new Node();
        newNode.value = value;
        newNode.nextNode = beforeNode.nextNode
        beforeNode.nextNode = newNode
    }

    this.removeAt = (index) => {
        const beforeNode = this.at(index-1)
        const removedNode = beforeNode.nextNode
        beforeNode.nextNode = removedNode.nextNode
        removedNode.nextNode = null
    }

    this.toString = () => {
        
        function printNode(node, result) {
            if (!node) {
                return result += `null`
            }
            result += `( ${node.value} ) -> `;
            return printNode(node.nextNode, result)
        }

        return printNode(this.root,"")
    }


}

function Node() {
    this.value = null;
    this.nextNode = null;
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());
console.log(list.pop())
console.log(list.toString());
list.insertAt("turtle",2)
console.log(list.toString());
list.removeAt(2)
console.log(list.toString());