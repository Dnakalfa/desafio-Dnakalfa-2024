class RecintosZoo {
    constructor() {
        //construtores para criação de animais e recintos especificos
        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: [{ especie: 'LEAO', quantidade: 1 }] }
        ];
    }
    
    analisaRecintos(animal, quantidade) {
        //converte para maiusculo as strings de entrada, garantindo as comparações
        let tipoAnimal = animal.toUpperCase()
        
        //testa as entradas iniciais, validando os tipos de animais e quantidade
        if (!this.animais[tipoAnimal]) {
            return { erro: "Animal inválido" };
        }
        if (typeof quantidade !== 'number' || quantidade <= 0 || quantidade % 1 !== 0) {
            return { erro: "Quantidade inválida" };
        }

        //filtra os recintos viáveis para o animal coletado e que atendem aos requisitos do constrututor
        const { tamanho, biomas, carnivoro } = this.animais[tipoAnimal]; 
        const recintosViaveis = []; 
        
        //percorre os recintos para verificar se há espaço suficiente para o tipo de animal coletado e promove sua alocação
        this.recintos.forEach((recinto) => {
            const espacoOcupado = recinto.animaisExistentes.reduce((total, animal) => {
                return total + animal.quantidade * this.animais[animal.especie].tamanho;
            }, 0);
            
            if (!biomas.includes(recinto.bioma) && recinto.bioma !== 'savana e rio') {
                return; 
            }
            
            let espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;
            if (carnivoro && recinto.animaisExistentes.length > 0) {
                const conviventes = recinto.animaisExistentes.some(animal => animal.especie !== tipoAnimal);
                if (conviventes) return; 
            }
                        
            const carnívorosExistentes = recinto.animaisExistentes.some(animal => this.animais[animal.especie].carnivoro);
            if (carnívorosExistentes && !carnivoro) {
                return; 
            }
            if (tipoAnimal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
                return; 
            }
            
            if (tipoAnimal === 'MACACO' && recinto.animaisExistentes.length === 0 && quantidade < 2) {
                return; 
            }
            
            const outrasEspecies = recinto.animaisExistentes.some(animal => animal.especie !== tipoAnimal);
            if (outrasEspecies) {
                espacoDisponivel -= 1;
            }
            if (espacoDisponivel >= quantidade * tamanho) {
                const espacoLivre = espacoDisponivel - (quantidade * tamanho);
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
            }
        });
        
        //Ao retornar os recintos, indica locações viáveis e, caso não haja, um aviso de não há um resinto disponivel
        return recintosViaveis.length > 0 ? { recintosViaveis } : { erro: "Não há recinto viável" };
    }
}

export { RecintosZoo as RecintosZoo };

