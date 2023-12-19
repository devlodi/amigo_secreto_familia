// Já que estamos usando a versão de CDN, não precisamos do import aqui.
// O Firebase já estará disponível globalmente.

// Configuração do Firebase. Isso é seguro para ser exposto publicamente conforme a documentação do Firebase.
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXOqm52mwBr4RH3KuP5MrGeyYg1qQy27M",
  authDomain: "amigo-secreto-8b3ae.firebaseapp.com",
  databaseURL: "https://amigo-secreto-8b3ae-default-rtdb.firebaseio.com",
  projectId: "amigo-secreto-8b3ae",
  storageBucket: "amigo-secreto-8b3ae.appspot.com",
  messagingSenderId: "133611460498",
  appId: "1:133611460498:web:2641aafc8c318aaa4d134b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Referência ao banco de dados
const database = firebase.database();

// Esta função deve estar disponível globalmente para ser acessada pelo atributo onclick do seu HTML.
window.submitName = function() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value;
    const dateTime = new Date().toISOString();
    
    // Insere o nome no banco de dados Firebase
    firebase.database().ref('participants').push().set({
        nome: name,
        data_hora: dateTime
    });
}

// Escuta por novos participantes e atualiza a tabela
firebase.database().ref('participants').on('value', (snapshot) => {
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
