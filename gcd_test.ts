import { assertEquals } from "@std/assert";
import { gcdBruteForce } from "./gcd.ts";

Deno.test("Grösster gemeinsamer Teiler von 1 und 1", () => {
  const result = gcdBruteForce(1, 1);
  assertEquals(result, 1);  
});

Deno.test("Grösster gemeinsamer Teiler von 6 und 9", () => {
  const result = gcdBruteForce(6, 9);
  assertEquals(result, 3);  
});


