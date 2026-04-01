export function gcdBruteForce(a: number, b: number): number {
  let gcd = 1; 
  const limit = Math.min(a, b); 

  for (let i = 1; i <= limit; i++) {
    if (a % i === 0 && b % i === 0) {
      gcd = i; 
    }
  }

  return gcd;
}
export function gcdEuclid(a: number, b: number): number {
    
  while (a !== b) {
    const maxNum = Math.max(a, b);
    const minNum = Math.min(a, b);
    const c = maxNum - minNum;
    a = minNum;
    b = c;
  }
  return a; 
}
    

