import { assertAlmostEquals, assertEquals } from "@std/assert";
import { Fraction } from "./fraction.ts";

Deno.test("fraction of 1/1 is 1.0", () => {
  // Arrange
  const fraction = new Fraction(1, 1);

  // Act
  const float = fraction.toFloat(0.1);

  // Assert
  assertEquals(float, 1.0);
});

Deno.test("fraction of 2/3 is roughly 0.67", () => {
  // Arrange
  const fraction = new Fraction(2, 3);

  // Act
  const float = fraction.toFloat(0.01);

  // Assert
  assertAlmostEquals(float, 0.67);
});

Deno.test("1/3 + 2/6 = 2/3 is roughly 0.67", () => {
  // Arrange
  const left = new Fraction(1, 3);
  const right = new Fraction(2, 6);

  // Act
  const result = left.add(right);

  // Assert
  assertAlmostEquals(result.toFloat(0.01), 0.67);
});


Deno.test("Addition von Brüchen", () => {
  const a = new Fraction(1, 2);
  const b = new Fraction(1, 3);
  const result = a.add(b);
  assertEquals(result.toString(), "5/6");
});

Deno.test("Creating fraction with denominator 0 throws error", () => {
  
  try {
    new Fraction(3, 0);
    throw new Error("Expected error was not thrown"); // Falls kein Error
  } catch (e: unknown) {               // ← hier
    if (e instanceof Error) {
      assertEquals(e.message, "Denominator cannot be zero");
    } else {
      throw e; // falls es etwas anderes ist
    }
  }


  try {
    Fraction.parse("3/0");
    throw new Error("Expected error was not thrown");
  } catch (e: unknown) {               // ← hier
    if (e instanceof Error) {
      assertEquals(e.message, "Denominator cannot be zero");
    } else {
      throw e;
    }
  }
});