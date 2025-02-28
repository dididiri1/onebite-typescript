/**
 * keyof 연산자
 */
function getPropertyKey(person, key) {
    return person[key];
}
const person = {
    name: "홍갈동",
    age: 17,
};
getPropertyKey(person, "name");
export {};
