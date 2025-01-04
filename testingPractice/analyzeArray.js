function analyzeArray(arr) {
    return {
        average: arr.reduce( (total, value) => {return total + value})/arr.length,
        min: arr.reduce( (result, value) => {return value < result ? value : result}),
        max: arr.reduce( (result, value) => {return result > value ? result : value}),
        length: arr.length
    }
}

module.exports = analyzeArray