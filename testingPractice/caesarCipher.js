function caesarCipher(str, shift) {

    function _shiftUniCode(char, shift, start, end) {
        let code = char.charCodeAt(0) + shift;
        if (code > end) {
            code = code - end + start - 1;
        }
        if (code < start) {
            code = code -start + end + 1;
        }
        return String.fromCharCode(code)
    }
    
    let result = "";
    
    for (let i=0; i< str.length; i++){
        const code = str.charCodeAt(i);
        if (code >= 97 && code <= 122) {
            // lowercase
            result += _shiftUniCode(str[i], shift, 97, 122)
        }
        else if (code >= 65 && code <= 90) {
            // lowercase
            result += _shiftUniCode(str[i], shift, 65, 90)
        }
        else {
            result += str[i]
        }
    }

    return result
}

module.exports = caesarCipher