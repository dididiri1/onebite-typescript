// void

function func1(): void {
  console.log("hello");
}

// never

function func2(): never {
  while (true) {}
}

function func3(): never {
  throw new Error();
}
