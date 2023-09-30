export function arraysHaveSameObjects<T>(arrayA: T[], arrayB: T[]): boolean {
  // Check if the arrays have the same length
  if (arrayA.length !== arrayB.length) {
    return false
  }

  // Create a copy of arrayB to keep track of matched objects
  const copyOfArrayB = [...arrayB]

  // Iterate through arrayA and try to find corresponding objects in copyOfArrayB
  for (const objA of arrayA) {
    let found = false

    // Iterate through copyOfArrayB to find a matching object
    for (let i = 0; i < copyOfArrayB.length; i++) {
      const objB = copyOfArrayB[i]

      // Check if the objects are equal (deep comparison)
      if (JSON.stringify(objA) === JSON.stringify(objB)) {
        found = true
        // Remove the matched object from copyOfArrayB to avoid duplicate matches
        copyOfArrayB.splice(i, 1)
        break
      }
    }

    // If a matching object was not found in copyOfArrayB, return false
    if (!found) {
      return false
    }
  }

  // If all objects in arrayA have corresponding matches in copyOfArrayB, return true
  return true
}
