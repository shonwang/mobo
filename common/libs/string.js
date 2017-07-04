define('string', function(require, exports, module){
    
    /*
     * @arguments [str, 1, 2, 3, 4, *]
     */
    var format = function(){
        var str = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1);
        var sprintfRegex = /\{(\d+)\}/g;

        var sprintf = function (match, number) {
            return number in args ? args[number] : match;
        };
    
        return str.replace(sprintfRegex, sprintf);
    }
    //exports.format = format;
});