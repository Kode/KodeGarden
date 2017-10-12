package custom;

typedef MonarchLanguage = {
    var keywords: Array<String>;
    var typeKeywords: Array<String>;
    var operators: Array<String>;
    var symbols: js.RegExp;
    var escapes: js.RegExp;
    var tokenizer: {
        var root: Array<Dynamic>;
        var comment: Array<Dynamic>;
        var string: Array<Dynamic>;
        var whitespace: Array<Dynamic>;
    };
}

class Syntax {
	public static function haxe(): MonarchLanguage {
		return {
			// Set defaultToken to invalid to see what you do not tokenize yet
			// defaultToken: 'invalid',
			keywords: [
				'try', 'catch', 'throw', 'if', 'return', 'while', 'for',
				'return', 'break', 'case', 'default', 'continue', 'do',
				'while', 'for', 'switch', 'if', 'else', '...', 'cast',
				'untyped', 'trace', 'this', 'super', 'new', 'var',
				'function', 'abstract', 'class', 'enum', 'interface', 'typedef',
				'from', 'to', 'default', 'get', 'set', 'dynamic', 'never', 'null',
				'public', 'private', 'static', 'dynamic', 'inline', 'macro', 'extern', 'override',
				'import', 'package'
			],
			typeKeywords: [
				'Bool', 'Float', 'Int'
			],
			operators: [
				'=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
				'&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
				'<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
				'%=', '<<=', '>>=', '>>>='
			],
			// we include these common regular expressions
			symbols: new js.RegExp('[=><!~?:&|+\\-*\\/\\^%]+'),
			// C# style strings
			escapes: new js.RegExp('\\\\(?:[abfnrtv\\\\"\']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})'),
			// The main tokenizer for our languages
			tokenizer: {
				root: [
					// identifiers and keywords
					[new js.RegExp('[a-z_$][\\w$]*'), { cases: { '@typeKeywords': 'keyword',
						'@keywords': 'keyword',
						'@default': 'identifier' } }],
					[new js.RegExp('[A-Z][\\w\\$]*'), 'type.identifier' ],  // to show class names nicely
					// whitespace
					{ include: '@whitespace' },
					// delimiters and operators
					[new js.RegExp('[{}()\\[\\]]'), '@brackets'],
					[new js.RegExp('[<>](?!@symbols)'), '@brackets'],
					[new js.RegExp('@symbols'), { cases: { '@operators': 'operator',
						'@default'  : '' } } ],
					// @ annotations.
					// As an example, we emit a debugging log message on these tokens.
					// Note: message are supressed during the first load -- change some lines to see them.
					[new js.RegExp('@\\s*[a-zA-Z_\\$][\\w\\$]*'), { token: 'annotation', log: 'annotation token: $0' }],
					// numbers
					[new js.RegExp('\\d*\\.\\d+([eE][\\-+]?\\d+)?'), 'number.float'],
					[new js.RegExp('0[xX][0-9a-fA-F]+'), 'number.hex'],
					[new js.RegExp('\\d+'), 'number'],
					// delimiter: after number because of .\d floats
					[new js.RegExp('[;,.]'), 'delimiter'],
					// strings: recover on non-terminated strings
					[new js.RegExp('"([^"\\\\]|\\\\.)*$'), 'string.invalid' ],  // non-teminated string
					[new js.RegExp('\'([^\'\\\\]|\\\\.)*$'), 'string.invalid' ],  // non-teminated string
					[new js.RegExp('"'), 'string', '@string."' ],
					[new js.RegExp('\''), 'string', '@string.\'' ],
					// characters
					[new js.RegExp('[^\\\\\']\''), 'string'],
					[new js.RegExp('(\')(@escapes)(\')'), ['string','string.escape','string']],
					[new js.RegExp('\''), 'string.invalid']
				],
				comment: [
					[new js.RegExp('[^\\/*]+'), 'comment' ],
					[new js.RegExp('\\/\\*'), 'comment', '@push' ],  // nested comment
					[new js.RegExp('"\\\\*/"'), 'comment', '@pop' ],
					[new js.RegExp('[\\/*]'), 'comment' ]
				],
				string: [
					[new js.RegExp('[^\\\\"\']+'), 'string'],
					[new js.RegExp('@escapes'), 'string.escape'],
					[new js.RegExp('\\\\.'), 'string.escape.invalid'],
					[new js.RegExp('["\']'),     { cases: { '$#==$S2' : { token: 'string', next: '@pop' },
						'@default': 'string' }} ]
				],
				whitespace: [
					[new js.RegExp('[ \\t\\r\\n]+'), 'white'],
					[new js.RegExp('\\/\\*'),       'comment', '@comment' ],
					[new js.RegExp('\\/\\/.*$'),    'comment'],
				],
			},
		};
	}

	public static function glsl(): MonarchLanguage {
		return {
			// Set defaultToken to invalid to see what you do not tokenize yet
			// defaultToken: 'invalid',
			keywords: [
				'try', 'catch', 'throw', 'if', 'return', 'while', 'for',
				'return', 'break', 'case', 'default', 'continue', 'do',
				'while', 'for', 'switch', 'if', 'else', '...', 'cast',
				'untyped', 'trace', 'this', 'super', 'new', 'var',
				'function', 'abstract', 'class', 'enum', 'interface', 'typedef',
				'from', 'to', 'default', 'get', 'set', 'dynamic', 'never', 'null',
				'public', 'private', 'static', 'dynamic', 'inline', 'macro', 'extern', 'override',
				'import', 'package'
			],
			typeKeywords: [
				'Bool', 'Float', 'Int'
			],
			operators: [
				'=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
				'&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
				'<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
				'%=', '<<=', '>>=', '>>>='
			],
			// we include these common regular expressions
			symbols: new js.RegExp('[=><!~?:&|+\\-*\\/\\^%]+'),
			// C# style strings
			escapes: new js.RegExp('\\\\(?:[abfnrtv\\\\"\']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})'),
			// The main tokenizer for our languages
			tokenizer: {
				root: [
					// identifiers and keywords
					[new js.RegExp('[a-z_$][\\w$]*'), { cases: { '@typeKeywords': 'keyword',
						'@keywords': 'keyword',
						'@default': 'identifier' } }],
					[new js.RegExp('[A-Z][\\w\\$]*'), 'type.identifier' ],  // to show class names nicely
					// whitespace
					{ include: '@whitespace' },
					// delimiters and operators
					[new js.RegExp('[{}()\\[\\]]'), '@brackets'],
					[new js.RegExp('[<>](?!@symbols)'), '@brackets'],
					[new js.RegExp('@symbols'), { cases: { '@operators': 'operator',
						'@default'  : '' } } ],
					// @ annotations.
					// As an example, we emit a debugging log message on these tokens.
					// Note: message are supressed during the first load -- change some lines to see them.
					[new js.RegExp('@\\s*[a-zA-Z_\\$][\\w\\$]*'), { token: 'annotation', log: 'annotation token: $0' }],
					// numbers
					[new js.RegExp('\\d*\\.\\d+([eE][\\-+]?\\d+)?'), 'number.float'],
					[new js.RegExp('0[xX][0-9a-fA-F]+'), 'number.hex'],
					[new js.RegExp('\\d+'), 'number'],
					// delimiter: after number because of .\d floats
					[new js.RegExp('[;,.]'), 'delimiter'],
					// strings: recover on non-terminated strings
					[new js.RegExp('"([^"\\\\]|\\\\.)*$'), 'string.invalid' ],  // non-teminated string
					[new js.RegExp('\'([^\'\\\\]|\\\\.)*$'), 'string.invalid' ],  // non-teminated string
					[new js.RegExp('"'), 'string', '@string."' ],
					[new js.RegExp('\''), 'string', '@string.\'' ],
					// characters
					[new js.RegExp('[^\\\\\']\''), 'string'],
					[new js.RegExp('(\')(@escapes)(\')'), ['string','string.escape','string']],
					[new js.RegExp('\''), 'string.invalid']
				],
				comment: [
					[new js.RegExp('[^\\/*]+'), 'comment' ],
					[new js.RegExp('\\/\\*'), 'comment', '@push' ],  // nested comment
					[new js.RegExp('"\\\\*/"'), 'comment', '@pop' ],
					[new js.RegExp('[\\/*]'), 'comment' ]
				],
				string: [
					[new js.RegExp('[^\\\\"\']+'), 'string'],
					[new js.RegExp('@escapes'), 'string.escape'],
					[new js.RegExp('\\\\.'), 'string.escape.invalid'],
					[new js.RegExp('["\']'),     { cases: { '$#==$S2' : { token: 'string', next: '@pop' },
						'@default': 'string' }} ]
				],
				whitespace: [
					[new js.RegExp('[ \\t\\r\\n]+'), 'white'],
					[new js.RegExp('\\/\\*'),       'comment', '@comment' ],
					[new js.RegExp('\\/\\/.*$'),    'comment'],
				],
			},
		};
	}
}
