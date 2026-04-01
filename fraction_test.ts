import { assertAlmostEquals, assertEquals } from "@std/assert";
import { Fraction } from "./fraction.ts";

const fractionTests = [
  { numerator: 2, denominator: 4, expected: "1/2" },
  { numerator: 10, denominator: 5, expected: "2/1" },
  { numerator: 36, denominator: 60, expected: "3/5" },
  { numerator: 7, denominator: 1, expected: "7/1" },
  { numerator: 0, denominator: 5, expected: "0/1" },
];

for (const { numerator, denominator, expected } of fractionTests) {
  Deno.test(`Fraction(${numerator}, ${denominator}) -> ${expected}`, () => {
    const frac = new Fraction(numerator, denominator);
    assertEquals(frac.toString(), expected);
  });
}


Deno.test("Bruch kürzen 1/1", () => {
  const frac = new Fraction(1, 1);
  frac.cancel();
  assertEquals(frac.numerator, 1);
  assertEquals(frac.denominator, 1);
});

Deno.test("Bruch kürzen 14/21 -> 2/3", () => {
  const frac = new Fraction(14, 21);
  frac.cancel();
  assertEquals(frac.numerator, 2);
  assertEquals(frac.denominator, 3);
});

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