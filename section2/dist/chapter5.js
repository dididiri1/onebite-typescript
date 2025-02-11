// enum 타입
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 10] = "ADMIN";
    Role[Role["USER"] = 11] = "USER";
    Role[Role["GUEST"] = 12] = "GUEST";
})(Role || (Role = {}));
var Language;
(function (Language) {
    Language["korean"] = "ko";
    Language["english"] = "en";
})(Language || (Language = {}));
const user1 = {
    name: "김구라",
    role: Role.ADMIN,
    language: Language.korean,
};
const user2 = {
    name: "홍길동",
    role: Role.USER,
};
const user3 = {
    name: "아무개",
    role: Role.GUEST,
};
console.log(user1, user2, user3);
export {};
