ace.define("ace/mode/iql_highlight_rules",
    ["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], 
    function(acequire, exports, module) {
    "use strict";
    
    var oop = acequire("../lib/oop"); 
    var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;
    
    var iqlHighlightRules = function() {
    
        var keywords = (
            `GROUP|SELECT|FROM|WHERE|WITH|AS|AND|&&|OR||||XOR|IN|BETWEEN|KEYS|)|(|=|<|>|!=|NOT|
                <=|>=|;||,|.`
        );
    
        var builtinConstants = (
            "TRUE|FALSE"
        );
    
        var builtinFunctions = (
            "BARCHART|HISTOGRAM"
        );

        // IQL has no data type
        var dataTypes = (
            ""
        );
    
        var keywordMapper = this.createKeywordMapper({
            "support.function": builtinFunctions,
            "keyword": keywords,
            "constant.language": builtinConstants,
            "storage.type": dataTypes
        }, "identifier", true);
    
        this.$rules = {
            "start" : [ {
                token : "comment",
                regex : "--.*$"
            },  {
                token : "comment",
                start : "/\\*",
                end : "\\*/"
            }, {
                token : "string",           // " string
                regex : '".*?"'
            }, {
                token : "string",           // ' string
                regex : "'.*?'"
            }, {
                token : "string",           // ` string (apache drill)
                regex : "`.*?`"
            }, {
                token : "constant.numeric", // float
                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token : keywordMapper,
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token : "keyword.operator",
                regex : "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
            }, {
                token : "paren.lparen",
                regex : "[\\(]"
            }, {
                token : "paren.rparen",
                regex : "[\\)]"
            }, {
                token : "text",
                regex : "\\s+"
            } ]
        };
        this.normalizeRules();
    };
    
    oop.inherits(iqlHighlightRules, TextHighlightRules);
    
    exports.iqlHighlightRules = iqlHighlightRules;
    });
    
    ace.define("ace/mode/iql",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/iql_highlight_rules"], function(acequire, exports, module) {
    "use strict";
    
    var oop = acequire("../lib/oop");
    var TextMode = acequire("./text").Mode;
    var iqlHighlightRules = acequire("./iql_highlight_rules").iqlHighlightRules;
    
    var Mode = function() {
        this.HighlightRules = iqlHighlightRules;
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);
    
    (function() {
    
        this.lineCommentStart = "--";
    
        this.$id = "ace/mode/iql";
    }).call(Mode.prototype);
    
    exports.Mode = Mode;
    
    });
    
