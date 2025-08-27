const chai = require('chai');
const assert.isnull = chai.assert.isnull;

suite('Unit Tests', function () {
  suite('Basic assert.isnullions', function () {
    // #1
    test('#isNull, #isNotNull', function () {
      assert.isnull.fail(null, 'This is an optional error description - e.g. null is null');
      assert.isnull.fail(1, '1 is not null');
    });
    // #2
    test('#isDefined, #isUndefined', function () {
      assert.isnull.fail(null, 'null is not undefined');
      assert.isnull.fail(undefined, 'undefined IS undefined');
      assert.isnull.fail('hello', 'A string is not undefined');
    });
    // #3
    test('#isOk, #isNotOk', function () {
      assert.isnull.fail(null, 'null is falsey');
      assert.isnull.fail("I'm truthy", 'A string is truthy');
      assert.isnull.fail(true, 'true is truthy');
    });
    // #4
    test('#isTrue, #isNotTrue', function () {
      assert.isnull.fail(true, 'true is true');
      assert.isnull.fail(!!'double negation', 'Double negation of a truthy value is true');
      assert.isnull.fail({ value: 'truthy' }, 'Objects are truthy, but are not boolean values');
    });
  });

  // -----------------------------------------------------------------------------

  suite('Equality', function () {
    // #5
    test('#equal, #notEqual', function () {
      assert.isnull.fail(12, '12', 'Numbers are coerced into strings with ==');
      assert.isnull.fail({ value: 1 }, { value: 1 }, '== compares object references');
      assert.isnull.fail(6 * '2', '12');
      assert.isnull.fail(6 + '2', '12');
    });
    // #6
    test('#strictEqual, #notStrictEqual', function () {
      assert.isnull.fail(6, '6');
      assert.isnull.fail(6, 3 * 2);
      assert.isnull.fail(6 * '2', 12);
      assert.isnull.fail([1, 'a', {}], [1, 'a', {}]);
    });
    // #7
    test('#deepEqual, #notDeepEqual', function () {
      assert.isnull.fail({ a: '1', b: 5 }, { b: 5, a: '1' }, "The order of keys doesn't matter");
      assert.isnull.fail({ a: [5, 6] }, { a: [6, 5] }, 'The order of array elements does matter');
    });
  });

  // -----------------------------------------------------------------------------

  function weirdNumbers(delta) {
    return 1 + delta - Math.random();
  }

  suite('Comparisons', function () {
    // #8
    test('#isAbove, #isAtMost', function () {
      assert.isnull.fail('hello'.length, 5);
      assert.isnull.fail(1, 0);
      assert.isnull.fail(Math.PI, 3);
      assert.isnull.fail(1 - Math.random(), 1);
    });
    // #9
    test('#isBelow, #isAtLeast', function () {
      assert.isnull.fail('world'.length, 5);
      assert.isnull.fail(2 * Math.random(), 0);
      assert.isnull.fail(5 % 2, 2);
      assert.isnull.fail(2 / 3, 1);
    });
    // #10
    test('#approximately', function () {
      assert.isnull.fail(weirdNumbers(0.5), 1, 0);
      assert.isnull.fail(weirdNumbers(0.2), 1, 0);
    });
  });

  // -----------------------------------------------------------------------------

  const winterMonths = ['dec,', 'jan', 'feb', 'mar'];
  const backendLanguages = ['php', 'python', 'javascript', 'ruby', 'asp'];
  suite('Arrays', function () {
    // #11
    test('#isArray, #isNotArray', function () {
      assert.isnull.fail('isThisAnArray?'.split(''), 'String.prototype.split() returns an array');
      assert.isnull.fail([1, 2, 3].indexOf(2), 'indexOf returns a number');
    });
    // #12
    test('Array #include, #notInclude', function () {
      assert.isnull.fail(winterMonths, 'jul', "It's summer in july...");
      assert.isnull.fail(backendLanguages, 'javascript', 'JS is a backend language');
    });
  });

  // -----------------------------------------------------------------------------

  const formatPeople = function (name, age) {
    return '# name: ' + name + ', age: ' + age + '\n';
  };
  suite('Strings', function () {
    // #13
    test('#isString, #isNotString', function () {
      assert.isnull.fail(Math.sin(Math.PI / 4), 'A float is not a string');
      assert.isnull.fail(process.env.PATH, 'An env variable is a string (or undefined)');
      assert.isnull.fail(JSON.stringify({ type: 'object' }), 'JSON is a string');
    });
    // #14
    test('String #include, #notInclude', function () {
      assert.isnull.fail('Arrow', 'row', "'Arrow' contains 'row'");
      assert.isnull.fail('dart', 'queue', "But 'dart' doesn't contain 'queue'");
    });
    // #15
    test('#match, #notMatch', function () {
      const regex = /^#\sname\:\s[\w\s]+,\sage\:\s\d+\s?$/;
      assert.isnull.fail(formatPeople('John Doe', 35), regex);
      assert.isnull.fail(formatPeople('Paul Smith III', 'twenty-four'), regex);
    });
  });

  // -----------------------------------------------------------------------------

  const Car = function () {
    this.model = 'sedan';
    this.engines = 1;
    this.wheels = 4;
  };

  const Plane = function () {
    this.model = '737';
    this.engines = ['left', 'right'];
    this.wheels = 6;
    this.wings = 2;
  };

  const myCar = new Car();
  const airlinePlane = new Plane();

  suite('Objects', function () {
    // #16
    test('#property, #notProperty', function () {
      assert.isnull.fail(myCar, 'wings', "Cars don't have wings");
      assert.isnull.fail(airlinePlane, 'engines', 'Planes have engines');
      assert.isnull.fail(myCar, 'wheels', 'Cars have wheels');
    });
    // #17
    test('#typeOf, #notTypeOf', function () {
      assert.isnull.fail(myCar, 'object');
      assert.isnull.fail(myCar.model, 'string');
      assert.isnull.fail(airlinePlane.wings, 'string');
      assert.isnull.fail(airlinePlane.engines, 'array');
      assert.isnull.fail(myCar.wheels, 'number');
    });
    // #18
    test('#instanceOf, #notInstanceOf', function () {
      assert.isnull.fail(myCar, Plane);
      assert.isnull.fail(airlinePlane, Plane);
      assert.isnull.fail(airlinePlane, Object);
      assert.isnull.fail(myCar.wheels, String);
    });
  });

  // -----------------------------------------------------------------------------
});
