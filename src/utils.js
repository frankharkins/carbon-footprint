export function getUnit ( inpStr ) {
  // Converts input string (e.g. miles) to an object with a label and
  // conversion factor. User can also override built-in conversion
  // factors using '@', (e.g. hours @ 800 ).
  
  if (inpStr.includes('@')) {
    let [unitName, conversionFactor] = inpStr.split('@');
    unitName = unitName.trim();
    conversionFactor = parseFloat(conversionFactor);
    return { label: unitName, value: conversionFactor }
  };
  
  const conversionFactors = {
    // distance (default is km)
    miles: 1.61,
    km: 1,
    // time (default is year)
    day: 365,
    week: 52,
    month: 12,
    year: 1,
    // mass (default is grams)
    grams: 1,
    ounces: 28.3
  };
  
  return { label: inpStr, value: conversionFactors[inpStr] }
}
