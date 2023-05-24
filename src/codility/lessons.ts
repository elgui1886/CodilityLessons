function CountingElement_MaxCounters(N: number, A: number[]): number[] {
  let counters = Array(N);
  let maxCounter = 0;
  for (let i = 0; i < A.length; i++) {
    const targetCounter = A[i]!;
    if (targetCounter > N) {
      counters = counters.fill(maxCounter);
    } else {
      let value = counters[targetCounter - 1] ?? 0;
      value = value + 1;
      if (value > maxCounter) {
        maxCounter = value;
      }
      counters[targetCounter - 1] = value;
    }
  }
  return counters;
}
function CountingElement_MissingInteger(A: number[]): number {
  const counter: number[] = [];

  for (let i = 0; i < A.length; i++) {
    const value = A[i]!;
    if (value > 0) {
      counter[value - 1] = 1;
    }
  }

  const index = [...counter.values()].indexOf(undefined as any);
  return index === -1 ? counter.length + 1 : index + 1;
}

function PrefixSum_PassingCars(A: number[]): number {
  const sumprefix: number[] = [];
  sumprefix[0] = 0;
  let index = 0;
  for (let i = 0; i < A.length; i++) {
    const value = A[i];
    if (value === 0) {
      index++;
      sumprefix[index] = sumprefix[index - 1] as number;
    } else {
      sumprefix[index] = sumprefix[index]! + index * 1;
    }
  }
  return sumprefix[sumprefix.length - 1]!;
}
function PrefixSum_CountDiv(A: number, B: number, K: number) {
  if (A === B) {
    return B % K === 0 ? 1 : 0;
  }

  // Massimo numero possibile, quello effettivo sara minore o uguale a questo
  let maxcounter = Math.floor(B / K) - Math.floor(A / K);
  if (A % K === 0) {
    maxcounter++;
  }
  return maxcounter;
}
function PrefixSum_GenomicRangeQuery2(S: string, P: number[], Q: number[]): number[] {
  const map = new Map<string, number>([
    ["A", 1],
    ["C", 2],
    ["G", 3],
    ["T", 4],
  ]);

  const result: number[] = [];
  for (let i = 0; i < P.length; i++) {
    const querystart = P[i];
    const queryend = Q[i]!;
    const spliced = S.slice(querystart, queryend + 1);
    if (spliced.length === 1) {
      const dnaValue = spliced[0]!;
      const number = map.get(dnaValue);
      if (number) {
        result.push(number);
        continue;
      }
    }

    const sorted = spliced.split("").sort();
    const dnaValue = sorted[0];
    const number = map.get(dnaValue);
    if (number) {
      result.push(number);
    }
  }
  return result;
}
function PrefixSum_GenomicRangeQuery(S: string, P: number[], Q: number[]) {
  const map = new Map<string, number>([
    ["A", 1],
    ["C", 2],
    ["G", 3],
    ["T", 4],
  ]);

  const counter = new Map<string, number[]>([
    ["A", []],
    ["C", []],
    ["G", []],
    ["T", []],
  ]);

  const dna_array = S.split("");
  for (let i = 0; i < dna_array.length; i++) {
    const char = dna_array[i];
    counter.get(char)?.push(i);
  }

  let ret: number[] = [];
  for (let j = 0; j < P.length; j++) {
    const start = P[j];
    const end = Q[j];
    [...counter.keys()].every((key) => {
      const values = counter.get(key);
      if (values?.some((val) => val >= start && val <= end)) {
        ret.push(map.get(key)!);
        return false;
      }
      return true;
    });
  }
  return ret;
}
function PrefixSum_MinAvgTwoSlice(A: number[]) {
  let n: number = A.length;
  if (n < 3) {
    return 0;
  }
  let min_index = 0;
  let min_value = Number.MAX_VALUE;
  for (let i = 0; i < n - 1; i++) {
    let t: number = (A[i]! + A[i + 1]!) / 2;
    if (t < min_value) {
      min_value = t;
      min_index = i;
    }
  }
  for (let i = 0; i < n - 2; i++) {
    let t = (A[i]! + A[i + 1]! + A[i + 2]!) / 3;
    if (t < min_value) {
      min_value = t;
      min_index = i;
    }
  }
  return min_index;
}
function Sorting_MaxProductOfThree(A: number[]) {
  const length = A.length;
  if (length < 4) {
    return A[0]! * A[1]! * A[2]!;
  }

  const sorted = A.sort((a, b) => {
    if (a < 0 && b < 0) {
      return Math.abs(b) - Math.abs(a);
    }
    return a - b;
  });

  const firstcandidate =
    sorted[length - 1]! * sorted[length - 2]! * sorted[length - 3]!;
  const secondcadidate = sorted[length - 1]! * sorted[0]! * sorted[1]!;
  if (firstcandidate > secondcadidate) {
    return firstcandidate;
  }
  return secondcadidate;
}  

function Sorting_Triangle(A: number[]) {
  const sorted = A.sort((a, b) => b - a);
  for (let i = 0; i < sorted.length - 2; i++) {
    const firstValue = sorted[i]!;
    const secondValue = sorted[i + 1]!;
    const thirdValue = sorted[i + 2]!;
    if (secondValue + thirdValue > firstValue) {
      return 1;
    }
  }
  return 0;
}
function Sorting_NumberOfDiscIntersections3(A: number[]) {
  interface model {
    min: number;
    max: number;
  }

  if (A.every((val) => val === 0)) {
    return 0;
  }

  const modelArray: model[] = [];
  let count = 0;
  for (let i = 0; i < A.length; i++) {
    const center = i;
    const rage = A[i]!;
    const min = -rage + center;
    const max = rage + center;
    modelArray.push({ min, max });
    if (i === 0) {
      continue;
    }
    for (let j = 1; j < modelArray.length; j++) {
      const val = modelArray[i - j]!;
      const othermin = val.min;
      const othermax = val.max;
      if (!(max < othermin || othermax < min)) {
        count++;
        if (count > 100000) {
          return -1;
        }
      }
    }
  }

  return count;
} 
function Sorting_NumberOfDiscIntersections2(A: number[]) {
  if (A.every((val) => val === 0)) {
    return 0;
  }

  const modelArray: any[] = [];
  for (let i = 0; i < A.length; i++) {
    const center = i;
    const rage = A[i]!;
    const min = -rage + center;
    const max = rage + center;
    modelArray.push({ min, max });
  }
  const sortedModelArray = modelArray.sort((a, b) => a.min - b.min);
  let count = 0;
  for (let i = 0; i < sortedModelArray.length; i++) {
    const max = sortedModelArray[i].max;
    for (let j = i + 1; j < modelArray.length; j++) {
      const val = modelArray[j]!;
      const othermin = val.min;
      if (othermin < max) {
        count++;
        if (count > 100000) {
          return -1;
        }
      } else {
        break;
      }
    }
  }

  return count;
} 
function Sorting_NumberOfDiscIntersections(A: number[]) {
  let b = A.map((a, i) => [i, i - a, i + a]).sort((a, b) => {
    return a[1]! - b[1]!;
  });
}

function StackAndQueue_Brackets(S: string): number {
  const symbols = new Map<string, string>([
    [")", "("],
    ["}", "{"],
    ["]", "["],
  ]);

  const push = new Set<string>(["(", "{", "["]);

  const stack: string[] = [];
  for (let i = 0; i < S.length; i++) {
    const current = S[i]!;
    if (push.has(current)) {
      stack.push(current);
    } else {
      const removed = stack.pop();
      if (!removed) {
        return 0;
      }
      if (symbols.get(current) !== removed) {
        return 0;
      }
    }
  }
  return stack.length === 0 ? 1 : 0;
}
function StackAndQueue_Fish(A: number[], B: number[]): number {
  console.log(A, B);
  const length = A.length;

  let stack: number[] = [];
  let leftCount = 0;

  for (let i = 0; i < length; i++) {
    const direction = B[i];

    if (direction === 1) {
      stack.push(A[i]!);
    } else {
      while (stack.length > 0) {
        const elm = stack.pop();
        if (elm! > A[i]!) {
          stack.push(elm!);
          break;
        }
      }
      if (stack.length === 0) {
        leftCount++;
      }
    }
  }
  return leftCount + stack.length;
}
function StackAndQueue_Nesting(S: string): number {
  const stack = [];
  for (let i = 0; i < S.length; i++) {
    const char = stack[i];
    if (char === ")") {
      if (stack.length === 0) {
        return 0;
      } else {
        stack.pop();
      }
    } else {
      stack.push("(");
    }
  }

  return stack.length === 0 ? 1 : 0;
}
function StackAndQueue_StoneWall(H: number[]): number {
  let wall: number[] = [];
  let blocks = 0;
  for (let i = 0; i < H.length; i++) {
    let current = H[i]!;

    let last = wall[wall.length - 1]!;

    if (current < last) {
      while (current < last) {
        wall.pop();
        blocks++;
        last = wall[wall.length - 1]!;
      }
    }

    if (current === last) {
      continue;
    }
    if (wall.length === 0 || current > last) {
      wall.push(current);
      continue;
    }
  }
  return wall.length + blocks;
}
