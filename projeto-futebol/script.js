const perguntas = [
  { pergunta: "Qual sua posição favorita?", opcoes: ["Goleiro","Defensor","Meia","Atacante"] },
  { pergunta: "Qual sua maior qualidade?", opcoes: ["Velocidade","Criatividade","Finalização","Liderança"] },
  { pergunta: "Qual seu pé preferido?", opcoes: ["Direito","Esquerdo","Ambidestro"] },
  { pergunta: "Você prefere ser...", opcoes: ["Ídolo em clube pequeno","Estrela em clube gigante"] }
];

const clubes = [
  "Flamengo","Palmeiras","Corinthians","São Paulo","Santos","Grêmio","Internacional","Atlético Mineiro","Cruzeiro","Vasco","Botafogo",
  "Barcelona","Real Madrid","Atlético de Madrid","Sevilla",
  "Manchester United","Manchester City","Liverpool","Chelsea","Arsenal","Tottenham",
  "PSG","Lyon","Marseille",
  "Bayern de Munique","Borussia Dortmund","RB Leipzig",
  "Juventus","Milan","Inter de Milão","Napoli","Roma"
];

const nacionalidades = ["🇧🇷 Brasil","🇦🇷 Argentina","🇵🇹 Portugal","🇫🇷 França","🇪🇸 Espanha","🇮🇹 Itália","🏴 Inglaterra","🇩🇪 Alemanha","🇺🇾 Uruguai"];
const nomes = ["João Silva","Carlos Mendes","Rafael Costa","Diego Santos","Lucas Pereira","Matheus Rocha","André Oliveira","Pedro Gomes","Thiago Lima"];

let respostas = [], indice=0, nomeFinal="", nacionalidadeFinal="";

function iniciarQuiz() {
    const fotoInput = document.getElementById("fotoJogador").value;
generoFoto = fotoInput;
  const nomeInput=document.getElementById("nomeJogador").value.trim();
  const nacionalidadeInput=document.getElementById("nacionalidadeJogador").value;
  nomeFinal = nomeInput || nomes[Math.floor(Math.random()*nomes.length)];
  nacionalidadeFinal = (nacionalidadeInput==="Aleatório") ? nacionalidades[Math.floor(Math.random()*nacionalidades.length)] : nacionalidadeInput;
  document.getElementById("config").style.display="none";
  document.getElementById("quiz-container").style.display="block";
  mostrarPergunta();
}

function mostrarPergunta(){
  if(indice<perguntas.length){
    const q=perguntas[indice];
    let html=`<h2>${q.pergunta}</h2>`;
    q.opcoes.forEach(opcao=>{
      html+=`<button onclick="responder('${opcao}')">${opcao}</button>`;
    });
    document.getElementById("quiz-container").innerHTML=html;
  }else{gerarCarta();}
}

function responder(opcao){respostas.push(opcao);indice++;mostrarPergunta();}

function gerarCarta(){
  document.getElementById("quiz-container").style.display="none";

  const posicao = respostas[0] || "Meia";
  const qualidade = respostas[1] || "Velocidade";

  let stats={PAC:60,SHO:60,PAS:60,DRI:60,DEF:60,PHY:60};

  if(qualidade==="Velocidade") stats.PAC+=20;
  if(qualidade==="Criatividade") stats.PAS+=20;
  if(qualidade==="Finalização") stats.SHO+=20;
  if(qualidade==="Liderança") stats.PHY+=10;

  const overall = Math.floor((stats.PAC+stats.SHO+stats.PAS+stats.DRI+stats.DEF+stats.PHY)/6);

  let classe="carta-bronze";
  if(overall>=75) classe="carta-ouro";
  else if(overall>=65) classe="carta-prata";

  const clube=clubes[Math.floor(Math.random()*clubes.length)];

  const html=`<div class="fifa-card ${classe}" id="carta">
      <div class="overall">${overall}</div>
      <div class="posicao">${posicao}</div>
      <img src="https://i.pravatar.cc/150?img=${Math.floor(Math.random()*70)}" alt="Jogador">
      <div class="nome">${nomeFinal}</div>
      <div class="nacionalidade">${nacionalidadeFinal}</div>
      <div class="clube">🏟 ${clube}</div>
      <div class="stats">
        <div>PAC ${stats.PAC}</div>
        <div>SHO ${stats.SHO}</div>
        <div>PAS ${stats.PAS}</div>
        <div>DRI ${stats.DRI}</div>
        <div>DEF ${stats.DEF}</div>
        <div>PHY ${stats.PHY}</div>
      </div>
    </div>`;
  
  document.getElementById("resultado").innerHTML=html;
  document.getElementById("downloadBtn").style.display="block";
}

function baixarCarta(){
  html2canvas(document.querySelector("#carta")).then(canvas=>{
    const link=document.createElement("a");
    link.download="carta-fifa.png";
    link.href=canvas.toDataURL();
    link.click();
  });
}
let generoFoto = "Aleatório";
document.getElementById("fotoJogador").addEventListener("change", function() {
  generoFoto = this.value;
});
let fotoUrl = "";
if (generoFoto === "Masculino") {
  fotoUrl = `https://i.pravatar.cc/150?img=${Math.floor(Math.random()*34)+1}`;
} else if (generoFoto === "Feminino") {
  fotoUrl = `https://i.pravatar.cc/150?img=${Math.floor(Math.random()*(70-35))+35}`;
} else {
  fotoUrl = `https://i.pravatar.cc/150?img=${Math.floor(Math.random()*70)+1}`;
}