class Repository<T> {
  private data: T[] = [];

  add(item: T) {
    this.data.push(item);
  }

  getAll(): T[] {
    return this.data;
  }
}

class User {
  constructor(public name: string, public age: number) {
    
  }
}
class object1{
  constructor(public color: string ,public size:number, public weight: number) {
  }
}

interface User1 {
  name: string,  age: number
}

interface User2 {
  color: string ,size:number, weight: number
}


// Create a repository for User type
const userRepo = new Repository<User1>();
const objectRepo = new Repository<object1>();
userRepo.add({name: "Alice", age: 25});
userRepo.add({name: "Bob", age: 30});

console.log(userRepo.getAll());
objectRepo.add({color: "red", size: 10, weight: 100});
objectRepo.add({color: "blue", size: 20, weight: 200});

console.log(objectRepo.getAll());