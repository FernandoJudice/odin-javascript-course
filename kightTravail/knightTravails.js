function Node(value) {
    this.value = value
    this.pos = []

    for (let i=0; i<8; i++) {
        let x = y = 0;
        if (i % 2 == 0) {
            x = 1;
            y = 2;
        } else {
            x = 2;
            y = 1;
        }
        if (i>3) {
            x = -x;
        }
        if (i>1 && i<6) {
            y = - y
        }

        x = this.value[0] + x;
        y = this.value[1] + y;
        if (x>=0 && x<=7 && y>=0 && y<=7) {
            this.pos.push([x,y])
        }
    }    
}

function kightMoves(start,finish){

    const queue = [{curPos: start, path: []}];
    const history = [];
    let count = 0

    function _checkEqual (arr1,arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2)
    }

    function _checkHistory (pos,history) {
        return history.includes(JSON.stringify(pos))
    }

    function _knightMoves (queue, target) {
        const {curPos, path} = queue.shift()
        if (!curPos) {
            return null
        }
        path.push(curPos);
        history.push(curPos);
        const node = new Node(curPos);
      
        for (let pos of node.pos) {
            if (_checkEqual(pos,target)) {
                path.push(pos)
                return path
            } else if (!_checkHistory(history,pos)) {
                queue.push({curPos: pos, path:path.slice()})
            }
        }

        return _knightMoves(queue, target)
    }

    const result = _knightMoves(queue,finish,[])
    return `You made it in ${result.length-1} moves! here is your path: ${result}`
}

console.log(kightMoves([0,0],[7,7]))