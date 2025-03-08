/**
 * 맵드 타입
 */
// 한명의 유저 정보를 불러오는 기능
function fetchUser() {
    return {
        id: 1,
        name: "홍길동",
        age: 27,
    };
}
// 한명의 유저 정보를 수정하는 기능
function updateUser(user) {
    // ... 수정하는 기능
}
updateUser({
    id: 1,
    name: "홍길동",
    age: 25,
});
export {};
