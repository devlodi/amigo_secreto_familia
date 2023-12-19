import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

// Seu código de configuração do Firebase aqui
const firebaseConfig = {
  // Sua configuração
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function submitName() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value;
    const dateTime = new Date().toISOString();
    
    // Insere o nome no banco de dados Firebase
    push(ref(database, 'participants'), {
        nome: name,
        data_hora: dateTime
    });
}

// Escuta por novos participantes e atualiza a tabela
onValue(ref(database, 'participants'), (snapshot) => {
    const participantsTable = document.getElementById('participantsTable');
    
    // Limpa a tabela antes de inserir os novos valores
    participantsTable.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Data e Hora</th>
        </tr>
    `;
    
    snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        
        // Cria uma nova linha na tabela para cada participante
        const row = participantsTable.insertRow(-1);
        const cellName = row.insertCell(0);
        const cellDate = row.insertCell(1);
        
        cellName.textContent = childData.nome;
        cellDate.textContent = childData.data_hora;
    });
});
