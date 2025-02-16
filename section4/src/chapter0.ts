/**
 * 함수 타입 정의
 */

function func(a: number, b: number) {
  return a + b;
}

/**
 * 화살표 함수의 타입을 정의하는 방법
 */

// 이 반환값 타입은 화살표 함수에서 역시 반환값 기준으로 자동으로 추론
const add = (a: number, b: number) => a + b;

/**
 * 함수의 매개변수
 */

function introduce(name = "홍길동", age: number, tall?: number) {
  console.log(`name : ${name}`);
  if (typeof tall === "number") {
    console.log(`tall : ${tall}`);
  }
}

introduce("홍길동", 27, 175);

introduce("홍길동", 27);

function getSum(...rest: [number, number, number]) {
  let sum = 0;
  rest.forEach((it) => (sum += it));

  return sum;
}

getSum(1, 2, 3);

//getSum(1, 2, 3, 4, 5);
