class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  // Your code here.
  for (;;) {
    try {
      let mult = primitiveMultiply(a, b);
      return mult;
      break;
    } catch (e) {
      if (e instanceof MultiplicatorUnitFailure) {
        console.log("Multiply will try again");
      } else {
        throw e;
      }
    }
  }
}

console.log(reliableMultiply(8, 8));
// → 64
