'use strict';

var objGenerator = require('obj-generator');

function ensureInstance(klass) {
	return function() {
		var obj = arguments[0];
		if (obj == null) {
			throw Error('at least one argument required');
		}
		switch (true) {
			case obj instanceof klass:
				return obj;
			case Object === obj.constructor:
				return objGenerator(klass).apply(klass, arguments);
			default:
				throw Error([
					'expected a',
					klass.name,
					'or an Object, got a',
					obj.constructor.name
				].join(' '));
		}
	}
}

module.exports = ensureInstance;
