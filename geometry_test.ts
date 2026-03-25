import { assertAlmostEquals } from "@std/assert";
import { Circle, Point2D } from "./geometry.ts";

Deno.test("circumference of a circle with radius 5 is roughtly 31.416", () => {
  // Given
  const circle = new Circle(new Point2D(3, 4), 5);

  // When
  const actual = circle.circumference();

  // Then
  assertAlmostEquals(actual, 31.416, 0.01);
});

Deno.test("Move Point", () => {
  const p = new Point2D(2, 3);
  p.move(1, -1)
  assertAlmostEquals(p.x, 3);
  assertAlmostEquals(p.y, 2);
});
