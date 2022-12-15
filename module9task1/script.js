let parser = new DOMParser();

let xmlString = `<list> 
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;

let xmlDom = parser.parseFromString(xmlString, "text/xml");

let listNode = xmlDom.querySelector("list");
let studentNodes = listNode.querySelectorAll("student");

let result = {
  list: [],
};

studentNodes.forEach((studentNode) => {
  let nameNode = studentNode.querySelector("name");
  let langAttribute = nameNode.getAttribute("lang");
  let firstNode = nameNode.querySelector("first");
  let secondNode = nameNode.querySelector("second");
  let ageNode = studentNode.querySelector("age");
  let profNode = studentNode.querySelector("prof");

  let student = {
    name: {
      first: firstNode.textContent,
      second: secondNode.textContent,
      lang: langAttribute,
    },
    age: +ageNode.textContent,
    prof: profNode.textContent,
  };

  result.list.push(student);
});

console.log(`result`, result);
