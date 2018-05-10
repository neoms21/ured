export default function splitString(string, size, multiline) {
    var matchAllToken = multiline ? '[^]' : '.';
    var re = new RegExp(matchAllToken + '{1,' + size + '}', 'g');
    return string.match(re);
}