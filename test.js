'use strict';

require('chai').should();

var ensureInstance = require('./.');

function SimpleConstructor(def) {
	this.def = def;
}

function MultiArgsConstructor(def, custom) {
	this.def = def;
	def.custom = def.custom || custom;
}

suite('ensure-instance', function() {
	suite('simple constructor', function() {
		var ensureSimpleInstance = ensureInstance(SimpleConstructor);
		test('returns the object itself if already an instance', function() {
			var obj = new SimpleConstructor();
			ensureSimpleInstance(obj).should.equal(obj);
		});
		test('constructs a new instance for a bare object', function() {
			var obj = {};
			var instance = ensureSimpleInstance(obj);
			instance.should.be.instanceOf(SimpleConstructor);
			instance.def.should.eql(obj);
		});
		test.only('assumes empty object if no arg provided', function() {
			var instance = ensureSimpleInstance();
			instance.should.be.instanceOf(SimpleConstructor);
			instance.def.should.eql({});
		});
		test('throws Error if arg is not an object', function() {
			var notAnObject = 1;
			var call = function() { ensureSimpleInstance(notAnObject) };
			call.should.throw(Error, /expected.*or an Object/);
		});
	});
	test('can call multiple args', function() {
		var ensureMultiInstance = ensureInstance(MultiArgsConstructor);
		var instance = ensureMultiInstance({}, 2);
		instance.def.should.eql({ custom: 2 });
	})
});
