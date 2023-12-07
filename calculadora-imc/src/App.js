import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [grau, setGrau] = useState('');

  const calcularIMC = () => {
    const alturaMetros = altura / 100;
    const imcCalculado = peso / (alturaMetros * alturaMetros);
    setImc(imcCalculado.toFixed(2));
    definirClassificacao(imcCalculado);
  };

  const definirClassificacao = (imc) => {
    const { classe, grau } = getClassificacao(imc);
    setClassificacao(classe);
    setGrau(grau);
  };

  const getClassificacao = (imc) => {
    if (imc < 18.5) {
      return { classe: 'Abaixo do peso', grau: 'Abaixo do peso' };
    } else if (imc >= 18.5 && imc < 24.9) {
      return { classe: 'Peso normal', grau: 'Peso normal' };
    } else if (imc >= 25 && imc < 29.9) {
      return { classe: 'Sobrepeso', grau: 'Sobrepeso' };
    } else if (imc >= 30 && imc < 34.9) {
      return { classe: 'Obesidade Grau I', grau: 'Obesidade Grau I' };
    } else if (imc >= 35 && imc < 39.9) {
      return { classe: 'Obesidade Grau II', grau: 'Obesidade Grau II' };
    } else {
      return { classe: 'Obesidade Grau III', grau: 'Obesidade Grau III' };
    }
  };

  const getCorGrau = (grau) => {
    switch (grau) {
      case 'Abaixo do peso':
        return '#ffb74d';
      case 'Peso normal':
        return '#a5d6a7'; 
      case 'Sobrepeso':
        return '#ffb74d'; 
      case 'Obesidade Grau I':
        return '#f48fb1';
      case 'Obesidade Grau II':
        return '#ef9a9a'; 
      case 'Obesidade Grau III':
        return '#e57373'; 
      default:
        return '#000'; 
    }
  };

  return (
    <div className="App">
      <h1>Calculadora de IMC</h1>
      <div>
        <label>Altura (cm): </label>
        <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} />
      </div>
      <div>
        <label>Peso (kg): </label>
        <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />
      </div>
      <button onClick={calcularIMC}>Calcular</button>
      {imc && (
        <div>
          <h2>Resultado</h2>
          <p style={{ color: getCorGrau(grau) }}>IMC: {imc}</p>
          <p style={{ color: getCorGrau(grau) }}>Classificação: {classificacao}</p>
        </div>
      )}
      <div>
        <h2>Referência</h2>
        <table>
          <thead>
            <tr>
              <th>Classe</th>
              <th>IMC</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: '#e57373' }}>
              <td>Obesidade Grau III</td>
              <td>40 ou mais</td>
            </tr>
            <tr style={{ backgroundColor: '#ef9a9a' }}>
              <td>Obesidade Grau II</td>
              <td>35 - 39.9</td>
            </tr>
            <tr style={{ backgroundColor: '#f48fb1' }}>
              <td>Obesidade Grau I</td>
              <td>30 - 34.9</td>
            </tr>
            <tr style={{ backgroundColor: '#ffb74d' }}>
              <td>Sobrepeso</td>
              <td>25 - 29.9</td>
            </tr>
            <tr style={{ backgroundColor: '#a5d6a7' }}>
              <td>Normal</td>
              <td>18.5 - 24.9</td>
            </tr>
            <tr style={{ backgroundColor: '#ffb74d' }}>
              <td>Abaixo do peso</td>
              <td>Menos de 18.5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
