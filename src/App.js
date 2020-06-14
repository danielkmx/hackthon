import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
import Speech from 'react-speech';
import ChatBot from 'react-simple-chatbot';

function App() {
  const [route, setRoute] = useState([]);
  const [position, setPosition] = useState({});
  const [destination, setDestination] = useState(false);
  const [etapa, setEtapa] = useState(0);
  const [mensagens, setMensagens] = useState([]);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [googleTemp, setGoogleTemp] = useState({});
  const [respostas, setRespostas] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setEtapa(1);
      setMensagens([{ text: 'Qual destino da sua viagem?' }]);
    }, 1500);
    setGoogleTemp(window.google);
    navigator.geolocation.getCurrentPosition((pos) =>
      setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
    );
  });

  const dicionarioPerguntas = {
    1: 'Qual destino da sua viagem?',
    2: 'endereco',
    3: 'Que tipo de local para almoçar você prefere?',
    4: ['O lugar mais em conta', 'Um lugar com melhor nota'],
  };

  const voice = async () => {
    console.log('------------VOICE--------');
    const synthesis = window.speechSynthesis;

    // Get the first `en` language voice in the list
    var voice = await synthesis.getVoices().filter(function (voice) {
      return voice.lang === 'pt-BR';
    });
    console.log(voice);
    // Create an utterance object
    var utterance = new SpeechSynthesisUtterance(
      'Voce esta a 2 kilometros da sua parada para comer',
    );

    // Set utterance properties
    utterance.voice = voice[0];
    utterance.pitch = 1.0;
    utterance.rate = 1.0;
    utterance.volume = 0.8;

    // Speak the utterance
    synthesis.speak(utterance);
  };
  const addPerguntas = (etapa, mensagens) => {
    const etapaNova = etapa + 1;
    setTimeout(() => {
      setEtapa(etapaNova);
      setMensagens([...mensagens, { type: 'bot', text: dicionarioPerguntas[etapaNova] }]);
    }, 1500);
  };
  const addResposta = async (respostas, resposta, etapa) => {
    setTimeout(() => {
      if (dicionarioPerguntas[etapa] === 'endereco') {
        setDestination(resposta);
        setShouldSearch(true);
      }
      setRespostas([...respostas, resposta]);
      setEtapa(etapa + 1);
      setMensagens([...mensagens, { type: 'bot', text: dicionarioPerguntas[etapa + 1] }]);
    }, 1500);
  };

  return (
    <div className="chat-container">
      <ChatBot
        recognitionEnable={true}
        steps={[
          {
            id: '1',
            component: <div><strong>Oi Renato, eu sou o seu parceiro de bordo, o Chapa!</strong> Eu vou te ajudar a estar no lugar certo, do jeito certo e na hora certa 🙏</div>,
            trigger: 2,
          },
          {
            id: '2',
            component: <div>Você pode conta comigo para te ajudar e ver a sua programação completa após definir o destino.</div>,
            trigger: 3,
          },
          {
            id: '3',
            component: <div>Como estar no lugar certo e na hora certa.
                      <ul><li>Encontrar <strong>Paradas Seguras</strong> 🅿️ recomendadas.</li>
                      <li>Saber onde são os <strong>Postos de Gasolina</strong>. ⛽</li>
                      <li>Comer nos <strong>Restaurantes</strong> 🍛 mais adequados para você.</li></ul></div>,
            trigger:`3.1`,
          },
          {
            id: '3.1',
            component: <div>Antes de começar,
             eu vou precisar da sua ajuda para definir suas preferências de jornada, são só 5 perguntas. Qual a sua idade <strong>(1/5)</strong>?</div>,
            trigger: '4',
          },
          {
            id: '4',
            options: [
              { value: 1, label: 'Jovem (<24 )', trigger: '5' },
              { value: 2, label: 'Adulto Jovem (25-40)', trigger: '5' },
              { value: 3, label: 'Adulto (40-64)', trigger: '5' },
              { value: 4, label: 'Idoso (65+)', trigger: '5' },
            ],
          },

          {
            id: '5',
            component: <div>Com qual frequência você gostaria de fazer exercícios durante a semana <strong>(2/5)</strong>?</div>,
            trigger: '6',
          },
          {
            id: '6',
            options: [
              { value: 5, label: '3 vezes', trigger: '7.1' },
              { value: 6, label: '5 vezes', trigger: '7.2' },
              { value: 7, label: '7 vezes', trigger: '7.3' },
            ],
          },
          {
            id: '7.1',
            component: <div>Mandou bem!
            De forma geral, a atividade física e um fator determinante para maiores benefícios à saúde 💪.
            Posso te notificar durante o dia para vocês não se esquecer de beber a quantidade de água certa <strong>(3/5)</strong>?</div>,
            trigger: `7.4`
          },
          {
            id: '7.2',
            component: <div>Parabéns, você está no caminho certo!.
            De forma geral, a atividade física e um fator determinante para maiores benefícios à saúde 💪.
            Posso te notificar durante o dia para vocês não se esquecer de beber a quantidade de água certa <strong>(3/5)</strong>?</div>,
            trigger: `7.4`
          },
          {
            id: '7.3',
            component: <div><strong>Medalha Silvester Stallonge para você!</strong>
            De forma geral, a atividade física e um fator determinante para maiores benefícios à saúde 💪.
            Posso te notificar durante o dia para vocês não se esquecer de beber a quantidade de água certa <strong>(3/5)</strong>?</div>,
            trigger: `7.4`
          },
          {
            id: '7.4',
            options: [
              { value: 8, label: 'Sim', trigger: '8.1' },
              { value: 9, label: 'Nāo', trigger: '8.2' },
            ],
          },
          {
            id: '8.1',
            component: <div>Manter o corpo hidratado é fundamental.
            Qual dessas frases você se identifica mais <strong>(4/5)</strong>?</div>,
            trigger: `9`
          },
          {
            id: '8.2',
            component: <div>Manter o corpo hidratado é fundamental. Se mudar de ideia é só alterar as preferências em seu perfil.
            Qual dessas frases você se identifica mais <strong>(4/5)</strong>?</div>,
            trigger: `9`
          },
          {
            id: '9',
            options: [
              { value: 10, label: '(A) Pequenos barulhos ou um pouco de luz me mantem acordado ou me acordam com facilidade.', trigger: '10' },
              { value: 11, label: '(B) Eu normalmente acordo antes do meu dispertador tocar.', trigger: '10' },
              { value: 12, label: '(C) Eu já fui diagnóstica com insonia.', trigger: '10' },
              { value: 13, label: '(D) Sinto cansaço após o almoço.', trigger: '10' },
            ],
          },
          {
            id: '10',
            component: <div>Qual é sua preferência <strong>(5/5)</strong>?</div>,
            trigger: `11`
          },
          {
            id: '11',
            options: [
              { value: 14, label: 'Lanches', trigger: '12' },
              { value: 15, label: 'Pizza', trigger: '12' },
              { value: 16, label: 'Comida vegetariana', trigger: '12' },
              { value: 17, label: 'Comida japonesa', trigger: '12' },
              { value: 18, label: 'Açai', trigger: '12' },
              { value: 19, label: 'Comida arábe', trigger: '12' },
              { value: 20, label: 'Comida italiana', trigger: '12' },
              { value: 21, label: 'Comida chinesa', trigger: '12' },
            ],
          },
          {
            id: '12',
            component: <div>Tudo anotado aqui, <strong>vamos botar o pé na estrada!</strong> 🚛💨</div>,
            end:true
          },            
        ]}
      />  
      <Map
        setShouldSearch={setShouldSearch}
        shouldSearch={shouldSearch}
        destination={destination}
        google={window.google}
        position={position}
      />
    </div>
  );
}

export default App;
