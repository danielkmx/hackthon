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
            message: 'Oi Renato, eu sou o seu parceiro de bordo o Chapa!',
            trigger: 2,
          },
          {
            id: '2',
            message: 'Posso te ajudar em uma nova jornada?',
            trigger: 3,
          },
          {
            id: '3',
            message: `Como estar no lugar certo e na hora certa
        Encontrar Paradas Seguras recomendadas
        Saber onde são os Postos de Gasolina
        Comer nos Restaurantes mais adequados para você
        Você pode contar comigo para te ajudar e ver a sua programação completa após definir o destino.`,
            end: true,
          },
          {
            id: '3',
            message: `Antes de começar,
             eu vou precisar da sua ajuda para definir suas preferências de jornada, são só 5 perguntas. Qual sua idade?`,
            trigger: '4',
          },
          {
            id: '4',
            options: [
              { value: 1, label: 'Jovem(<25)', trigger: '5' },
              { value: 2, label: 'Adulto Jovem(25-40)', trigger: '5' },
              { value: 3, label: 'Adulto(40-64)', trigger: '5' },
              { value: 4, label: 'Idoso(65+)', trigger: '5' },
            ],
          },

          {
            id: '5',
            message: `Ótimo estamos quase lá!`,
            end: true,
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
