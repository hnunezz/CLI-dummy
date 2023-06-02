/*
  Usage
 
 node {file}.js <command> <-flags> <--options[=value]> <arguments>
 
 Example:
    node cli-dummy.js
    node cli-dummy.js help
    node cli-dummy.js hello
    node cli-dummy.js hello -a
    node cli-dummy.js hello --to={name}
    node cli-dummy.js hello -a --to={name}
*/

//?Invocação da linha de comando -- Retira-se os dois comandos padroes (node && cli-dummy.js)
//?A partir disso a const 'argv' passa receber os commands/flags/arguments
const argv = process.argv.slice(2);
const AVAILABLE_COMMANDS = ["help", "hello"];

const INSTRUCTION = {
  command: argv[0],
  arguments: argv.slice(1).filter((item) => !item.startsWith("-")),
  flags: argv.filter((item) => item.startsWith("-") && !item.startsWith("--")),
  options: argv
    .filter((item) => item.startsWith("--")) //?Filtra os Options '--options'
    .map((item) => item.split("=")) //?Separa o argumento do Option '[--to // {name}]'
    .reduce((acc, item) => ({ ...acc, ...{ [item[0]]: item[1] } }), {}), //?Cria um objeto de options { '--to': 'teste' }, e acessa o nome via Obj['--to']
};

// console.log(INSTRUCTION)
// console.log(argv)
console.log(
  [["--to", "teste"]].reduce(
    (acc, item) => ({ ...acc, ...{ [item[0]]: item[1] } }),
    {}
  )
);
console.log({ "--to": "teste" }["--to"]);
// console.log(process.argv[1].slice(1))

switch (INSTRUCTION.command) {
  case "help":
    help();
    break;

  case "hello":
    const toAll = INSTRUCTION.flags.includes("-a") ? "everybody" : "";
    const toPerson = INSTRUCTION.options[0] || "";
    hello(toAll, toPerson);
    break;

  default:
    help();
}

//! ------------------------------------------------

function help() {
  console.log(`Simple Node CLI Example. Commands available:
  help              prints help
  hello             -
    -a              prints hello to all
    --to=<person>   prints hello to a given name`);
}

function hello(toAll, toPerson) {
  const arg = [toAll, toPerson].every((value) => value == "");

  if (!arg) {
    const and = toAll && toPerson && "and";
    console.log(`hello ${toAll} ${and} ${toPerson}`);
  } else {
    console.log("hello to who?");
    help();
  }
}

//! ------------------------------------------------
// Por exemplo, se você executar seu script com:

// node app.js arthur 35
// você pode obter esses valores de uma maneira mais legível como esta:

// const [node, script, name, age] = process.argv;

// console.log(node); // node
// console.log(script); // app.js
// console.log(name); // arthur
// console.log(age); // 35
// Você pode omitir o primeiro e o segundo lugares de your process.argve ficar apenas com namee age:

// const [, , name, age] = process.argv;
// Se você quiser todos os argumentos em um array, você pode fazer isso usando o rest syntax, que coleta vários elementos e os condensa em um único elemento como este:

// const [node, script, ...params] = process.argv;

// console.log(node); // node
// console.log(script); // app.js
// console.log(params); // [ 'arthur', '35' ]
// e, claro, você pode omitir o primeiro e o segundo lugares do seu process.argve ficar apenas com seus parâmetros :

// const [, , ...params] = process.argv;

//Ref https://stackoverflow.com/questions/22213980/could-someone-explain-what-process-argv-means-in-node-js-please