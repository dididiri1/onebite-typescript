// any
let anyVar = 10;
anyVar = "hello";
anyVar = true;
anyVar = {};
anyVar.toUpperCase();
anyVar.toFixed();
anyVar.a;
let num = 10;
// unknown
let unknownVar;
unknownVar = "";
unknownVar = 1;
unknownVar = () => { };
if (typeof unknownVar === "number") {
    num = unknownVar;
}
export {};
