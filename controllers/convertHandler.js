function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    
    // Extract number using regex
    let numRegex = /^([\d.\/]*)/; 
    let match = input.match(numRegex);
    let numStr = match ? match[0] : '';

    if (!numStr) return 1;

    if (numStr.includes('/')) {
        let fractionParts = numStr.split('/');

        if (fractionParts.length !== 2) return null;

        let numerator = parseFloat(fractionParts[0]);
        let denominator = parseFloat(fractionParts[1]);

        if (isNaN(numerator) || isNaN(denominator)) return null;

        result = numerator / denominator;
    } else {
        result = parseFloat(numStr);
    }

    return isNaN(result) ? null : result;
  };
  
  this.getUnit = function(input) {
    let result;

    let unitRegex = /[a-zA-Z]+$/;
    let match = input.match(unitRegex);
    if (!match) return null;

    let unit = match[0].toLowerCase();

    // Valid units
    let validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!validUnits.includes(unit)) return null;

    // Ensure 'L' is uppercase
    return unit === 'l' ? 'L' : unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    let unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return unitMap[initUnit] || null;
  };

  this.spellOutUnit = function(unit) {
    let unitNames = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return unitNames[unit] || null;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch (initUnit) {
      case 'gal':
          result = initNum * galToL;
          break;
      case 'L':
          result = initNum / galToL;
          break;
      case 'lbs':
          result = initNum * lbsToKg;
          break;
      case 'kg':
          result = initNum / lbsToKg;
          break;
      case 'mi':
          result = initNum * miToKm;
          break;
      case 'km':
          result = initNum / miToKm;
          break;
      default:
          return null;
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let fullInitUnit = this.spellOutUnit(initUnit);
    let fullReturnUnit = this.spellOutUnit(returnUnit);

    return `${initNum} ${fullInitUnit} converts to ${returnNum} ${fullReturnUnit}`;
  };
  
}

module.exports = ConvertHandler;
