const fc = require("fast-check");
const calculateTotalDistance = require("./app");

// Property: Output is a non-negative integer
fc.assert(
  fc.property(
    fc
      .integer({ min: 1, max: 100 })
      .chain((length) =>
        fc.tuple(
          fc.array(fc.integer(), { minLength: length, maxLength: length }),
          fc.array(fc.integer(), { minLength: length, maxLength: length })
        )
      ),
    ([loc1, loc2]) => {
      const distance = calculateTotalDistance(loc1, loc2);
      return Number.isInteger(distance) && distance >= 0;
    }
  )
);

// Property: Sorting minimizes the distance
fc.assert(
  fc.property(
    fc
      .integer({ min: 1, max: 100 })
      .chain((length) =>
        fc.tuple(
          fc.array(fc.integer(), { minLength: length, maxLength: length }),
          fc.array(fc.integer(), { minLength: length, maxLength: length })
        )
      ),
    ([loc1, loc2]) => {
      let unsortedDistance = 0;
      for (let i = 0; i < loc1.length; i++) {
        unsortedDistance += Math.abs(loc1[i] - loc2[i]);
      }
      const sortedDistance = calculateTotalDistance(loc1, loc2);
      return sortedDistance <= unsortedDistance;
    }
  )
);

// Property: Input arrays can be reversed without a change in output
fc.assert(
  fc.property(
    fc
      .integer({ min: 1, max: 100 })
      .chain((length) =>
        fc.tuple(
          fc.array(fc.integer(), { minLength: length, maxLength: length }),
          fc.array(fc.integer(), { minLength: length, maxLength: length })
        )
      ),
    ([loc1, loc2]) => {
      const distance1 = calculateTotalDistance(loc1, loc2);
      const distance2 = calculateTotalDistance(loc2, loc1);
      return distance1 === distance2;
    }
  )
);
