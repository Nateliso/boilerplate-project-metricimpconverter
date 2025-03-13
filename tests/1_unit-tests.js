const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    test('convertHandler should correctly read a whole number input', function() {
        assert.strictEqual(convertHandler.getNum("32kg"), 32);
    });

    test('convertHandler should correctly read a decimal number input', function() {
        assert.strictEqual(convertHandler.getNum("3.14mi"), 3.14);
    });

    test('convertHandler should correctly read a fractional input', function() {
        assert.strictEqual(convertHandler.getNum("1/2gal"), 0.5);
    });

    test('convertHandler should correctly read a fractional input with a decimal', function() {
        assert.strictEqual(convertHandler.getNum("2.5/5kg"), 0.5);
    });

    test('convertHandler should correctly return an error on a double-fraction', function() {
        assert.isNull(convertHandler.getNum("3/2/3lbs"));
    });

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
        assert.strictEqual(convertHandler.getNum("kg"), 1);
    });

    test('convertHandler should correctly read each valid input unit', function() {
        let units = ["gal", "L", "mi", "km", "lbs", "kg"];
        units.forEach(unit => assert.strictEqual(convertHandler.getUnit(`32${unit}`), unit));
    });

    test('convertHandler should correctly return an error for an invalid input unit', function() {
        assert.isNull(convertHandler.getUnit("32grams"));
    });

    test('convertHandler should return the correct return unit for each valid input unit', function() {
        let inputUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
        let expectedOutputUnits = ["L", "gal", "km", "mi", "kg", "lbs"];
        inputUnits.forEach((unit, i) => assert.strictEqual(convertHandler.getReturnUnit(unit), expectedOutputUnits[i]));
    });

    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
        let inputUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
        let expectedFullNames = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];
        inputUnits.forEach((unit, i) => assert.strictEqual(convertHandler.spellOutUnit(unit), expectedFullNames[i]));
    });

    test('convertHandler should correctly convert gal to L', function() {
        assert.strictEqual(convertHandler.convert(1, "gal"), 3.78541);
    });

    test('convertHandler should correctly convert L to gal', function() {
        assert.strictEqual(convertHandler.convert(1, "L"), 0.26417);
    });

    test('convertHandler should correctly convert mi to km', function() {
        assert.strictEqual(convertHandler.convert(1, "mi"), 1.60934);
    });

    test('convertHandler should correctly convert km to mi', function() {
        assert.strictEqual(convertHandler.convert(1, "km"), 0.62137);
    });

    test('convertHandler should correctly convert lbs to kg', function() {
        assert.strictEqual(convertHandler.convert(1, "lbs"), 0.45359);
    });

    test('convertHandler should correctly convert kg to lbs', function() {
        assert.strictEqual(convertHandler.convert(1, "kg"), 2.20462);
    });
});
