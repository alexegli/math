import { gcdBruteForce } from "./gcd.ts";
import { roundTo } from "./utils.ts";
import { gcdEuclid } from "./gcd.ts";



export class Fraction {
  constructor(
  public numerator: number,
  public denominator: number,
) {
    if (denominator === 0) throw new Error("Denominator cannot be zero");
    const gcdValue = gcdEuclid(numerator, denominator);
    this.numerator = numerator / gcdValue;
    this.denominator = denominator / gcdValue;
    

}


  public cancel(): Fraction {
    const gcd = gcdBruteForce(this.numerator, this.denominator);
    this.numerator = this.numerator / gcd;
    this.denominator = this.denominator / gcd;
    return this
  }

  public add(other: Fraction): Fraction {
  const newNumerator =
    this.numerator * other.denominator + other.numerator * this.denominator;
  const newDenominator = this.denominator * other.denominator;
  return new Fraction(newNumerator, newDenominator);
  }

  public subtract(other: Fraction) {
    const newNumerator =
      this.numerator * other.denominator - other.numerator * this.denominator;
    const newDenominator = this.denominator * other.denominator;
    this.numerator = newNumerator;
    this.denominator = newDenominator;
  }

  public multiply(other: Fraction) {
    const newNumerator = this.numerator * other.numerator;
    const newDenominator = this.denominator * other.denominator;
    this.numerator = newNumerator;
    this.denominator = newDenominator;
  }

  public divide(other: Fraction) {
    const newNumerator = this.numerator * other.denominator;
    const newDenominator = this.denominator * other.numerator;
    this.numerator = newNumerator;
    this.denominator = newDenominator;
    return this;
  }

  public toFloat(precision: number): number {
    return roundTo(this.numerator / this.denominator, precision);
  }

  public toString(): string {
    return `${this.numerator}/${this.denominator}`;
  }

  public static parse(expression: string): Fraction {
    const parts = expression.split("/");
    if (parts.length != 2) {
      throw new Error(`illegal syntax: "[numerator]/[denominator]" required`);
    }
    const numerator = Number.parseInt(parts[0].trim());
    const denominator = Number.parseFloat(parts[1].trim());
    if (Number.isNaN(numerator) || Number.isNaN(denominator)) {
      throw new Error(`non-numeric numerator/denominator`);
    }
    if (denominator === 0) {
      throw new Error("Denominator cannot be zero");
    }
    return new Fraction(numerator, denominator);
  }
}
