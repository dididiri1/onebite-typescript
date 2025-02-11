// enum 타입

enum Role {
  ADMIN = 10,
  USER = 11,
  GUEST = 12,
}

enum Language {
  korean = "ko",
  english = "en",
}

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
