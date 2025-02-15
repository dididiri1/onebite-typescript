let num1 = 10;
let num2 = 10;
num1 = num2;
let animal = {
    name: "기린",
    color: "yellow",
};
let dog = {
    name: "돌돌이",
    color: "brown",
    breed: "진도",
};
animal = dog; // ✅ OK
let book;
let programmingBook = {
    name: "한 입 크기로 잘라먹는 리액트",
    price: 33000,
    skill: "reactjs",
};
book = programmingBook; // ✅ OK
//programmingBook = book; // ❌ NO
let book2 = {
    // 오류 발생
    name: "한 입 크기로 잘라먹는 리액트",
    price: 33000,
    //skill: "reactjs", // ❌ NO
};
export {};
