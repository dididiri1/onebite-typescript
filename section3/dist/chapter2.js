// Unknown 타입
function UnknownExam() {
    let a = 1; // number -> unknown
    let b = "hello"; // string -> unknown
    let c = true; // boolean -> unknown
    let d = null; // null -> unknown
    let e = undefined; // undefined -> unknown
    let f = []; // Array -> unknown
    let g = {}; // Object -> unknown
    let h = () => { }; // Function -> unknown
    let unknownValue;
    // let a: number = unknownValue;
}
// Never 타입
function NeverExam() {
    function neverFunc() {
        while (true) { }
    }
    let num = neverFunc();
    let str = neverFunc();
    let bool = neverFunc();
    //let never1: never = 10;
    //let never2: never = "string";
    //let never3: never = true;
}
// Void 타입
function voidExam() {
    function voidFunc() {
        console.log("hi");
    }
    let voidVar = undefined;
}
// Any 타입
function anyExam() {
    let unknownVar;
    let anyVar;
    let undefinedVar;
    let neverVar;
    anyVar = unknownVar;
    undefinedVar = anyVar;
    //neverVar = anyVar;  // never -> any ❌
}
export {};
