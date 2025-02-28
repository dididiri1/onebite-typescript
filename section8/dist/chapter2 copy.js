/**
 * keyof 연산자
 */
function getPropertyKey(person, key) {
    return person[key];
}
const person = {
    name: "김강민",
    age: 12,
};
const v = getPropertyKey(person, "name");
console.log(v);
export {};
