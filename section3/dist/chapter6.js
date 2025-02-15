/**
 * 타입 단언
 */
let person = {};
person.name = "홍길동";
person.age = 10;
let dog = {
    name: "돌돌이",
    color: "brow",
    breed: "진도",
};
/**
 * 타입 단언의 규칙
 * 값 as 단언 <- 단언식
 * A as B
 * A가 B의 슈퍼타입이거나
 * A가 B의 서브타입이어야 함
 */
let num1 = 10;
let num2 = 10;
let num3 = 10;
/**
 * const 단언
 */
let num4 = 10;
let cat = {
    name: "야옹이",
    color: "yellow",
};
let post = {
    title: "게시글1",
    author: "홍길동",
};
const len = post.author?.length;
export {};
