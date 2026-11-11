class Animal {
    constructor(nome, idade, tutor) {
        this.nome = nome;
        this.idade = idade;
        this.tutor = tutor;
    }

    emitirSom() {
        throw new Error("Cada animal deve emitir seu próprio som.");
    }

    descreverCuidados() {
        throw new Error("Cada animal deve descrever seus cuidados.");
    }
}


class Cachorro extends Animal {
    emitirSom() {
        return `${this.nome} faz: Au Au!`;
    }

    descreverCuidados() {
        return "Precisa de passeio diário.";
    }
}

class Gato extends Animal {
    emitirSom() {
        return `${this.nome} faz: Miau!`;
    }

    descreverCuidados() {
        return "Precisa de arranhador.";
    }
}

class Ave extends Animal {
    emitirSom() {
        return `${this.nome} canta!`;
    }

    descreverCuidados() {
        return "Precisa de uma gaiola adequada.";
    }
}

class Funcionario {
    #salario;

    constructor(nome, matricula, salario) {
        this.nome = nome;
        this.matricula = matricula;
        this.alterarSalario(salario);
    }

    get salario() {
        return this.#salario;
    }

    alterarSalario(novoSalario) {
        if (novoSalario <= 0 || typeof novoSalario !== "number") {
            throw new Error("Salário inválido!");
        }

        this.#salario = novoSalario;
    }

    calcularBonus() {
        throw new Error("Cada funcionário deve calcular seu bônus.");
    }

    calcularPagamento() {
        return this.#salario + this.calcularBonus();
    }
}

class Veterinario extends Funcionario {
    constructor(nome, matricula, salario, valorPorConsulta) {
        super(nome, matricula, salario);
        this.valorPorConsulta = valorPorConsulta;
        this.consultasRealizadas = 0;
    }

    realizarConsulta() {
        this.consultasRealizadas++;
        return "Consulta realizada com sucesso!";
    }

    prescreverTratamento(animal, tratamento) {
        return `Tratamento prescrito para ${animal.nome}: ${tratamento}`;
    }

    calcularBonus() {
        return this.consultasRealizadas * this.valorPorConsulta;
    }
}


class Recepcionista extends Funcionario {
    constructor(nome, matricula, salario, valorPorAgendamento) {
        super(nome, matricula, salario);
        this.valorPorAgendamento = valorPorAgendamento;
        this.agendamentosConfirmados = 0;
    }

    agendarAtendimento() {
        this.agendamentosConfirmados++;
        return "Agendamento confirmado!";
    }

    calcularBonus() {
        return this.agendamentosConfirmados * this.valorPorAgendamento;
    }
}

class Consulta {
    constructor(animal, veterinario, data) {
        if (!(animal instanceof Animal)) {
            throw new Error("A consulta precisa de um animal.");
        }

        if (!(veterinario instanceof Veterinario)) {
            throw new Error("A consulta precisa de um veterinário.");
        }

        this.animal = animal;
        this.veterinario = veterinario;
        this.data = data;
    }

    realizar() {
        return this.veterinario.realizarConsulta();
    }
}

class Clinica {
    constructor(nome) {
        this.nome = nome;
        this.funcionarios = [];
        this.animais = [];
        this.consultas = [];
    }

    cadastrarFuncionario(funcionario) {
        this.funcionarios.push(funcionario);
    }

    cadastrarAnimal(animal) {
        this.animais.push(animal);
    }

    cadastrarConsulta(consulta) {
        this.consultas.push(consulta);
    }

    listarAnimais() {
        return this.animais;
    }

    listarFuncionarios() {
        return this.funcionarios;
    }
}


const clinica = new Clinica("Clínica da Dona Marta");

const cachorro = new Cachorro("Rex", 3, "João");
const gato = new Gato("Mimi", 2, "Maria");
const ave = new Ave("Loro", 1, "Pedro");

const veterinario = new Veterinario(
    "Carlos", 101, 3000, 50
);

const recepcionista = new Recepcionista(
    "Ana", 102, 1800, 10
);

clinica.cadastrarAnimal(cachorro);
clinica.cadastrarAnimal(gato);
clinica.cadastrarAnimal(ave);

clinica.cadastrarFuncionario(veterinario);
clinica.cadastrarFuncionario(recepcionista);

recepcionista.agendarAtendimento();

const consulta = new Consulta(
    cachorro,
    veterinario,
    "12/11/2026"
);

consulta.realizar();
clinica.cadastrarConsulta(consulta);

console.log("=== ANIMAIS ===");

clinica.listarAnimais().forEach(animal => {
    console.log("Nome:", animal.nome);
    console.log("Som:", animal.emitirSom());
    console.log("Cuidados:", animal.descreverCuidados());
    console.log("------------------");
});

console.log("=== FUNCIONÁRIOS ===");

clinica.listarFuncionarios().forEach(funcionario => {
    console.log("Nome:", funcionario.nome);
    console.log("Salário:", funcionario.salario);
    console.log("Bônus:", funcionario.calcularBonus());
    console.log("Pagamento:", funcionario.calcularPagamento());
    console.log("------------------");
});

console.log("=== CONSULTAS ===");

console.log(
    "Animal:",
    consulta.animal.nome
);

console.log(
    "Veterinário:",
    consulta.veterinario.nome
);

console.log(
    "Data:",
    consulta.data
);
