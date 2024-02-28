const readline = require('readline'); // Puxando o readline do NODEJS

let _userName = Symbol('User Name');
let _nameClass = Symbol('Name Class');

let listPerms = {
    admin: 'admin', // Permissão para alterar e visualizar todos os atributos de cada personagem.
    ninja: 'ninja',
    mage: 'mage',
    wizard: 'wizard',
    guest: 'guest', // Usuário sem conta... tem que criar uma conta para visualizar.
    tester: 'tester' // Usuário para testar visualizar qualquer atributo mas não pode alterar
}

let listAttributsPersons = {
  ninja: {
    life: 100,
    force: 50,
    speed: 80,
    intelligence: 75,
    nameClass: 'Ninja'
  },
  mage: {
    life: 100,
    force: 70,
    speed: 50,
    intelligence: 65,
    nameClass: 'Mago'
  },
  wizard: {
    life: 100,
    force: 60,
    speed: 50,
    intelligence: 40,
    nameClass: 'Bruxo'
  }
}

class BasePerson {
  constructor(name, { life, force, speed, intelligence, nameClass }, perm) {
    this[_userName] = name;

    this.life = life;
    this.force = force;
    this.speed = speed;
    this.intelligence = intelligence;
    this[_nameClass] = nameClass;

    this.perm = perm;
  }

  randomizationName(min, max) {
      min *= 1000; max *= 1000;
      return Math.floor(Math.random() * (max - min) + min);
  }

  showUserName() {
    return `O nome do seu personagem é: ${this.name}`;
  }
}

class Ninja extends BasePerson {
  constructor(name, { life, force, speed, intelligence, nameClass }, perm) {
    super(name, { life, force, speed ,intelligence, nameClass }, perm);
  }

  get showNameClass() {
    return this.perm != 'admin' && this.perm != 'tester' && this.perm != 'ninja'
    ? `Não é possível mostrar a classe, você não tem permissão.`
    : `A sua classe é: ${this[_nameClass]}.`
  }

  get captureNameClass() {
    return this[_nameClass];
  }

  get visualizeAttributes() {
    return this.perm != 'admin' && this.perm != 'tester' && this.perm != 'ninja'
    ? `Não é possível carregar as informações do personagem, você não tem permissão!` 
    : `Atributos: Vida: ${this.life}, Força: ${this.force}, velocidade: ${this.speed} e inteligencia: ${this.intelligence}.`
  }
}

class Mage extends BasePerson {
  constructor(name, { life, force, speed, intelligence, nameClass }, perm) {
    super(name, { life, force, speed, intelligence, nameClass }, perm);
  }

  get showNameClass() {
    return this.perm != 'admin' && this.perm != 'tester' && this.perm != 'mage'
    ? `Não é possível mostrar a classe, você não tem permissão.`
    : `A sua classe é: ${this[_nameClass]}.`
  }

  get captureNameClass() {
    return this[_nameClass];
  }

  get visualizeAttributes() {
    return this.perm != 'admin' && this.perm != 'tester' && this.perm != 'mage'
    ? `Não é possível carregar as informações do personagem, você não tem permissão!` 
    : `Atributos: Vida: ${this.life}, Força: ${this.force}, velocidade: ${this.speed} e inteligencia: ${this.intelligence}.`
  }
}

class Wizard extends BasePerson {
  constructor(name, { life, force, speed, intelligence, nameClass }, perm) {
    super(name, { life, force, speed, intelligence, nameClass}, perm); 
  }

  get showNameClass() {
    return this.perm != 'admin' && this.perm != 'tester' && this.perm != 'wizard'
    ? `Não é possível mostrar a classe, você não tem permissão.`
    : `A sua classe é: ${this[_nameClass]}.`
  }

  get captureNameClass() {
    return this[_nameClass];
  }

  get visualizeAttributes() {
    return this.perm != 'admin' && this.perm != 'tester' && this.perm != 'wizard'
    ? `Não é possível carregar as informações do personagem, você não tem permissão!` 
    : `Atributos: Vida: ${this.life}, Força: ${this.force}, velocidade: ${this.speed} e inteligencia: ${this.intelligence}.`
  }
}

const ninja = new Ninja('', listAttributsPersons.ninja ,listPerms.ninja);
const mage = new Mage('', listAttributsPersons.mage ,listPerms.mage);
const wizard = new Wizard('', listAttributsPersons.wizard ,listPerms.wizard);

const startGame = () => {
  let choosePerson;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const validationEnterName = (userName) => {
    return !(userName.length < 4 || userName.length > 20 || !isNaN(userName))
  }

  const enterName = () => {
    rl.question(`Digite o nome do seu ${choosePerson.captureNameClass}: `, (namePerson) => {
      if(validationEnterName(namePerson)) {
        choosePerson.name = namePerson || `Person-${choosePerson.randomizationName(1111, 9999)}`;
      } else {
        console.log("Nome inválido! O nome deve conter entre 4 e 20 caracteres e não pode ser um número.");
        return enterName();
      }

      if(choosePerson.name.slice(0, 7) === 'Person-') {
          rl.question(`Tem certeza que quer manter o nome ${choosePerson.name}? (Sim / Não): `, (answer) => {
            if(answer.toLowerCase() === 'sim') {
              console.log(`Seu nome vai manter ${choosePerson.name}!`);
              console.log(choosePerson.showNameClass);
              console.log(choosePerson.visualizeAttributes);
              rl.close();
            } else {
              rl.question(`Digite o nome do seu ${choosePerson.captureNameClass}: `, (namePerson) => {
                choosePerson.name = namePerson || `Person-${choosePerson.randomizationName(1111, 9999)}`;

                console.log(choosePerson.showUserName());
                console.log(choosePerson.showNameClass);
                console.log(choosePerson.visualizeAttributes);
  
                rl.close();
              })
            }
          })
      } else {
        console.log(`Seu nome agora é ${choosePerson.name}`);
      }
    })
  }

  //rl.question é para receber algum dado input
  rl.question('Escolha seu personagem (ninja, mage, wizard): ', (person) => {
      switch(person) {
        case 'ninja':
          choosePerson = ninja;
          break;
        case 'mage':
          choosePerson = mage;
          break;
        case 'wizard':
          choosePerson = wizard;
          break;
        default:
          console.log('Personagem inválido, tente novamente!');
          rl.close(); // Fechar a "conversa"
          return;
      }

      enterName();
  })
}

startGame();

