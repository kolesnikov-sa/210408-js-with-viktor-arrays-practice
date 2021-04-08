const students = [
  {
    name: "Bob",
    age: 22,
    isMarried: true,
    scores: 85,
  },
  {
    name: "Alex",
    age: 21,
    isMarried: true,
    scores: 90
  },
  {
    name: "Nick",
    age: 20,
    isMarried: false,
    scores: 120
  },
  {
    name: "John",
    age: 19,
    isMarried: false,
    scores: 100
  },
  {
    name: "Helen",
    age: 20,
    isMarried: false,
    scores: 110
  },
  {
    name: "Ann",
    age: 20,
    isMarried: false,
    scores: 105
  },
];

const user = {
  name: "Bob",
  age: 23,
  friends: ["Alex", "Nick", "John"]
}

//1. Создайте поверхностную копию объекта user
let copyUser = {...user};

//Проверка:
console.log(user);
console.log('shallow copy:', copyUser === user); // false - ссылки на разные объекты
console.log('shallow copy 2:', copyUser.name === user.name); // true
console.log('shallow copy 3:', copyUser.friends === user.friends); // true - ссылки на один и тот же массив


//2. Полная (глубокая) копия объекта user
// let deepCopyUser = JSON.parse(JSON.stringify(user)); - не кошерно (почитать, не все типы данных поддерживает)
let deepCopyUser = {...user, friends: [...user.friends]}

//Проверка:
console.log(user)
console.log('deep copy:', deepCopyUser === user) // false
console.log('deep copy 2:', deepCopyUser.name === user.name) // true — variables of primitive types are equal
console.log('deep copy 3:', deepCopyUser.friends === user.friends) // false — ссылки на разные массивы

//3. Поверхностная копия массива students
let copyStudents = [...students];

//Проверка:
console.log(students);
console.log('shallow copy:', copyStudents === students); // false
console.log('shallow copy 2:', copyStudents[0] === students[0]); // true
console.log('shallow copy 3:', copyStudents[1] === students[1]); // true

//4. Полная (глубокая) копия массива students
let deepCopyStudents = students.map(el => ({...el}));

//Проверка:
console.log(students);
console.log('deep copy:', deepCopyStudents === students); // false
console.log('deep copy 2:', deepCopyStudents[0] === students[0]); // false
console.log('deep copy 3:', deepCopyStudents[1] === students[1]); // false

// NB!!! Далее все преобразования выполняем не модифицируя исходный массив students
// Вывод результатов - в консоль

//5. Отсортируйте deepCopyStudents по алфавиту (sort)
console.log('deep copy sort:', deepCopyStudents
  .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

//5a. Отсортируйте deepCopyStudents по успеваемости(лучший идёт первым)(sort)
console.log('best student first:', deepCopyStudents.sort((a, b) => b.scores - a.scores))

//6. Сформируйте массив студентов, у которых 100 и более баллов (filter)
let bestStudents = deepCopyStudents.filter(el => el.scores >= 100);
console.log('best:', bestStudents);

//6a."Вырежьте" трёх лучших студентов из массива deepCopyStudents (splice)
let topStudents = deepCopyStudents.splice(0, 3);
console.log('top:', topStudents);
console.log(deepCopyStudents);

//6b. Объедините массивы deepCopyStudents и topStudents так,
// чтоб сохранился порядок сортировки (spread-опреатор)
// let newDeepCopyStudents = [...deepCopyStudents].concat(topStudents);
let newDeepCopyStudents = [...topStudents, ...deepCopyStudents];
console.log('new deep copy:', newDeepCopyStudents);

//7. Сформируйте массив холостых студентов (filter)
let notMarriedStudents = students.filter(el => !el.isMarried);
console.log('is not married:', notMarriedStudents)

//8. Сформируйте массив имён студентов (map)
let studentsNames = students.map(el => el.name);
console.log('names:', studentsNames)

//8a. Сформируйте строку из имён студентов, разделённых
// - запятой (join)
// - пробелом (join)
let nameWithSpace = studentsNames.join(' ');
console.log('name with space:', nameWithSpace)
let namesWithComma = studentsNames.join();
console.log('name with comma:', namesWithComma);

//9. Добавьте всем студентам свойство "isStudent" со значением true (map)
// let trueStudents = students.map(el => Object.assign(el, {isStudent: true}));
let trueStudents = students.map(el => ({...el, isStudent: true}));
console.log('true students:', trueStudents);

//10. Nick женился. Выполните соответствующие преобразование массива students (map)
// let studentsWithMarriedNick = students
//   .map(el => el)
//   .map(el => el.name === 'Nick'? Object.assign(el, {isMarried: true}): el);
let studentsWithMarriedNick = students.map(el => el.name === 'Nick' ? {...el, isMarried: true} : el);
console.log('married Nick:', studentsWithMarriedNick)

//11. Найдите студента по имени Ann (find)
let ann = students.find(el => el.name = 'Ann');
console.log('Ann:', ann)

//12. Найдите студента с самым высоким баллом (reduce)
let bestStudent = students.reduce((max, el) => el.scores > max.scores ? el : max);
console.log('best student:', bestStudent)

//13. Найдите сумму баллов всех студентов (reduce)
let scoresSum = students.reduce((sum, el) => sum + el.scores, 0);
console.log(scoresSum)

// 14.Напишите функцию addFriends, которая принимает параметром массив students
// и добавляет в каждому студенту свойство friends,
// значением которого является массив имён всех остальных студентов из массива,
// за исключением собственного имени студента. Т.е. в друзьях у Боба Боба быть не должно.
function addFriends(arr) {
  return arr.map(elOne => ({...elOne, friends: arr.filter(el => el.name !== elOne.name).map(el => el.name)}));
}
console.log(addFriends(students));





