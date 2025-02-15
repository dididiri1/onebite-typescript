/**
 * 대수 타입
 * -> 여러개의 타입을 합성해서 새롭게 만들어낸 타입
 * -> 합집합 타입과 교집합 타입이 존재한다.
 */
/**
 * 1. 합집합 - Union 타입
 */
let a;
a = 1;
a = "hello";
a = true;
let arr = [1, "hello", true];
let union1 = {
    name: "",
    color: "",
};
let union2 = {
    name: "",
    language: "",
};
let union3 = {
    name: "",
    color: "",
    language: "",
};
//let union4: Union1 = { // ❌
//    name: "",
//}
/**
 * 2. 교집한 타입 - Intersection 타입
 */
let variable;
let intersection1 = {
    name: "",
    color: "",
    language: ""
};
export {};
