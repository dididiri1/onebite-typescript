/**
 * 접근 제어자
 * access modifier
 */

class Employee {
  // 필드
  private name: string;
  protected age: number;
  public position: string;

  // 생성자
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메소드
  work() {
    console.log("일함");
  }
}

class ExecutiveOfficer extends Employee {
  // 필드
  officeNumber: number;

  // 생성자
  constructor(
    name: string,
    age: number,
    position: string,
    officeNumber: number
  ) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }

  // 메서드
  func() {
    //this.name; // ❌ 오류
    this.age; 
  }
}

const employee = new Employee("홍길동", 27, "개발자");
//employee.name = "춘식이"; // ❌ 오류
//employee.age = 1; // ❌ 오류
employee.position = "디자이너";
