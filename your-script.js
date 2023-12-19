console.log("Carregando configuração do Firebase.");

const firebaseConfig = {
  apiKey: "AIzaSyDXOqm52mwBr4RH3KuP5MrGeyYg1qQy27M",
  authDomain: "amigo-secreto-8b3ae.firebaseapp.com",
  databaseURL: "https://amigo-secreto-8b3ae-default-rtdb.firebaseio.com",
  projectId: "amigo-secreto-8b3ae",
  storageBucket: "amigo-secreto-8b3ae.appspot.com",
  messagingSenderId: "133611460498",
  appId: "1:133611460498:web:2641aafc8c318aaa4d134b"
};

console.log("Inicializando o Firebase.");
firebase.initializeApp(firebaseConfig);
console.log("Firebase inicializado.");

const database = firebase.database();

function submitName() {
    console.log("submitName chamado.");
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value;
    const dateTime = new Date().toISOString();

    console.log(`Adicionando nome: ${name}, Data/Hora: ${dateTime}`);
    firebase.database().ref('participants').push().set({
        nome: name,
        data_hora: dateTime
    }, (error) => {
        if (error) {
            console.error("Erro ao adicionar participante:", error);
        } else {
            console.log("Participante adicionado com sucesso.");
        }
    });
}

firebase.database().ref('participants').on('value', (snapshot) => {
    console.log("Dados recebidos do Firebase.", snapshot.val());
    const participantsTable = document.getElementById('participantsTable');
    
    participantsTable.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Data e Hora</th>
        </tr>
    `;
    
    snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        const row = participantsTable.insertRow(-1);
        const cellName = row.insertCell(0);
        const cellDate = row.insertCell(1);
        
        cellName.textContent = childData.nome;
        cellDate.textContent = childData.data_hora;
    });
});
