import React, { useState } from 'react';
import { Calculator, Settings, BarChart3, Info, Search, CheckCircle, Save, Trash2 } from 'lucide-react';
import { BearingTable } from './components/BearingTable';

interface CalculationResults {
  vidaUtil: number;
  vidaNominalHoras: number;
  capacidadeCargaDinamica: number;
  fatorVelocidade: number;
  potenciaAtrito: number;
  temperaturaOperacao: number;
  fatorSeguranca: number;
  coeficienteVida: number;
}

interface BearingSelectionResults {
  l10Revolutions: number;
  requiredCapacity: number;
  equivalentLoad?: number;
  xFactor?: number;
  yFactor?: number;
  faCoRatio?: number;
  selectedBearing?: {
    number: string;
    bore: number;
    outsideDia: number;
    width: number;
    dynamicLoad: number;
    staticLoad: number;
    mass: number;
  };
}

interface BearingData {
  number: string;
  bore: number;
  outsideDia: number;
  width: number;
  staticLoad: number;
  dynamicLoad: number;
  maxFilletRadius: number;
  minShaftDia: number;
  maxHousingDia: number;
  mass: number;
}

interface SavedCalculation {
  id: string;
  timestamp: Date;
  fr: number;
  n: number;
  tipoRolamento: string;
  capacidadeBasica: number;
  vidaNominalHoras: number;
  coeficienteVida: number;
}

function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'selection'>('calculator');
  
  // Estados para calculadora básica
  const [fr, setFr] = useState<string>('');
  const [n, setN] = useState<string>('');
  const [tipoRolamento, setTipoRolamento] = useState<string>('esferas');
  const [capacidadeBasica, setCapacidadeBasica] = useState<string>('');
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Estados para seleção de rolamentos
  const [frSelection, setFrSelection] = useState<string>('');
  const [faSelection, setFaSelection] = useState<string>('');
  const [nSelection, setNSelection] = useState<string>('');
  const [l10hSelection, setL10hSelection] = useState<string>('');
  const [shaftDiameter, setShaftDiameter] = useState<string>('');
  const [diameterUnit, setDiameterUnit] = useState<'mm' | 'in'>('mm');
  const [selectionResults, setSelectionResults] = useState<BearingSelectionResults | null>(null);
  const [showSelectionResults, setShowSelectionResults] = useState(false);

  // Estados para salvamento
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([]);
  const [showSavedTable, setShowSavedTable] = useState(false);

  const calcularRolamento = () => {
    const frValue = parseFloat(fr);
    const nValue = parseFloat(n);
    const cValue = parseFloat(capacidadeBasica);

    if (!frValue || !nValue || !cValue) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Fórmulas padrão para cálculos de rolamentos
    const p = tipoRolamento === 'esferas' ? 3 : 10/3; // Expoente para vida útil
    
    // Vida útil L10 em milhões de rotações
    const vidaUtil = Math.pow(cValue / frValue, p);
    
    // Vida útil em horas (L10)
    const vidaUtilHoras = (vidaUtil * 1000000) / (nValue * 60);
    
    // Vida nominal em horas usando a fórmula correta: Lh = 10^6/(60×N) × (C/P)³
    const vidaNominalHoras = (Math.pow(10, 6) / (60 * nValue)) * Math.pow(cValue / frValue, 3);
    
    // Capacidade de carga dinâmica necessária
    const capacidadeCargaDinamica = frValue * Math.pow(vidaUtil, 1/p);
    
    // Fator de velocidade (Fn) usando a fórmula correta: Fn = (10^6/(500×60×N))^(1/3)
    const fatorVelocidade = Math.pow(Math.pow(10, 6) / (500 * 60 * nValue), 1/3);
    
    // Coeficiente da vida: Lh = 10⁶/(60×N) × (C/P)³ = 500fh³
    const coeficienteVida = Math.pow(vidaNominalHoras / 500, 1/3);
    
    // Potência de atrito estimada (W)
    const potenciaAtrito = (frValue * nValue * 0.0015) / 1000;
    
    // Temperatura de operação estimada (°C)
    const temperaturaOperacao = 20 + (nValue * 0.05) + (frValue * 0.01);
    
    // Fator de segurança
    const fatorSeguranca = cValue / frValue;

    setResults({
      vidaUtil: vidaUtilHoras,
      vidaNominalHoras,
      capacidadeCargaDinamica,
      fatorVelocidade,
      potenciaAtrito,
      temperaturaOperacao,
      fatorSeguranca,
      coeficienteVida
    });
    
    setShowResults(true);
  };

  const salvarCalculo = () => {
    if (!results || !fr || !n || !capacidadeBasica) {
      alert('Execute um cálculo antes de salvar');
      return;
    }

    const novoCalculo: SavedCalculation = {
      id: Date.now().toString(),
      timestamp: new Date(),
      fr: parseFloat(fr),
      n: parseFloat(n),
      tipoRolamento,
      capacidadeBasica: parseFloat(capacidadeBasica),
      vidaNominalHoras: results.vidaNominalHoras,
      coeficienteVida: results.coeficienteVida
    };

    setSavedCalculations(prev => [...prev, novoCalculo]);
    setShowSavedTable(true);
    alert('Cálculo salvo com sucesso!');
  };

  const removerCalculo = (id: string) => {
    setSavedCalculations(prev => prev.filter(calc => calc.id !== id));
  };

  const convertDiameterToMm = (value: number, unit: 'mm' | 'in'): number => {
    return unit === 'in' ? value * 25.4 : value;
  };

  const calculateXYFactors = (faCoRatio: number): { x: number; y: number } => {
    if (faCoRatio <= 0.014) {
      return { x: 1, y: 0 };
    } else {
      // Interpolação linear para Y entre 1.2 e 2.0 baseada na razão Fa/Co
      const y = Math.min(2.0, 1.2 + (faCoRatio - 0.014) * (0.8 / 0.986)); // Interpolação até Fa/Co = 1.0
      return { x: 0.56, y };
    }
  };

  const calcularSelecaoRolamento = () => {
    const frValue = parseFloat(frSelection);
    const faValue = parseFloat(faSelection) || 0;
    const nValue = parseFloat(nSelection);
    const l10hValue = parseFloat(l10hSelection);
    const shaftDiaValue = parseFloat(shaftDiameter);

    if (!frValue || !nValue || !l10hValue) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Passo 1: Converter vida útil em horas para milhões de revoluções
    // L10 = L10h × N × 60 / 10^6
    const l10Revolutions = (l10hValue * nValue * 60) / Math.pow(10, 6);

    let requiredCapacity: number;
    let equivalentLoad: number | undefined;
    let xFactor: number | undefined;
    let yFactor: number | undefined;
    let faCoRatio: number | undefined;

    // Verificar se o diâmetro do eixo foi fornecido para usar cálculo avançado
    if (shaftDiaValue && shaftDiaValue > 0 && faValue > 0) {
      // Converter diâmetro para mm se necessário
      const shaftDiaMm = convertDiameterToMm(shaftDiaValue, diameterUnit);
      
      // Para cálculo avançado, precisamos estimar Co baseado em Fr
      // Usando uma relação típica Co ≈ 0.5 * C para rolamentos de esferas
      // Como não temos C ainda, usamos uma estimativa baseada em Fr
      const estimatedCo = frValue * 0.8; // Estimativa conservadora
      
      // Calcular razão Fa/Co
      faCoRatio = faValue / estimatedCo;
      
      // Calcular fatores X e Y
      const factors = calculateXYFactors(faCoRatio);
      xFactor = factors.x;
      yFactor = factors.y;
      
      // Calcular carga equivalente Pe = X × Fr + Y × Fa
      equivalentLoad = xFactor * frValue + yFactor * faValue;
      
      // Fórmula avançada: Creq = Pe × (L10/10⁶)^(1/3)
      requiredCapacity = equivalentLoad * Math.pow(l10Revolutions, 1/3);
    } else {
      // Cálculo simples original para carga radial pura
      requiredCapacity = frValue * Math.pow(l10Revolutions, 1/3);
    }

    setSelectionResults({
      l10Revolutions,
      requiredCapacity,
      equivalentLoad,
      xFactor,
      yFactor,
      faCoRatio
    });
    
    setShowSelectionResults(true);
  };

  const handleBearingSelect = (bearing: BearingData) => {
    if (selectionResults) {
      setSelectionResults({
        ...selectionResults,
        selectedBearing: {
          number: bearing.number,
          bore: bearing.bore,
          outsideDia: bearing.outsideDia,
          width: bearing.width,
          dynamicLoad: bearing.dynamicLoad,
          staticLoad: bearing.staticLoad,
          mass: bearing.mass
        }
      });
    }
  };

  const limparCampos = () => {
    if (activeTab === 'calculator') {
      setFr('');
      setN('');
      setCapacidadeBasica('');
      setResults(null);
      setShowResults(false);
    } else {
      setFrSelection('');
      setFaSelection('');
      setNSelection('');
      setL10hSelection('');
      setShaftDiameter('');
      setSelectionResults(null);
      setShowSelectionResults(false);
    }
  };

  const getShaftDiameterInMm = (): number => {
    const value = parseFloat(shaftDiameter);
    return value ? convertDiameterToMm(value, diameterUnit) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Calculadora de Rolamentos</h1>
              <p className="text-gray-600 mt-1">Sistema profissional para cálculos de engenharia mecânica</p>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'calculator'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Calculator className="h-4 w-4" />
                  <span>Calculadora Básica</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('selection')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'selection'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4" />
                  <span>Seleção de Rolamentos</span>
                </div>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'calculator' ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Painel de Entrada - Calculadora Básica */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Calculator className="h-6 w-6 text-white" />
                    <h2 className="text-xl font-semibold text-white">Parâmetros de Entrada</h2>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Carga Radial */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Carga Radial (Fr) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={fr}
                        onChange={(e) => setFr(e.target.value)}
                        placeholder="Digite a carga radial"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <span className="absolute right-3 top-3 text-gray-500 text-sm">N</span>
                    </div>
                  </div>

                  {/* Velocidade */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Velocidade de Rotação (N) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={n}
                        onChange={(e) => setN(e.target.value)}
                        placeholder="Digite a velocidade de rotação"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <span className="absolute right-3 top-3 text-gray-500 text-sm">rpm</span>
                    </div>
                  </div>

                  {/* Tipo de Rolamento */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Tipo de Rolamento
                    </label>
                    <select
                      value={tipoRolamento}
                      onChange={(e) => setTipoRolamento(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="esferas">Rolamento de Esferas</option>
                      <option value="rolos">Rolamento de Rolos</option>
                    </select>
                  </div>

                  {/* Capacidade Básica */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Capacidade de Carga Básica (C) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={capacidadeBasica}
                        onChange={(e) => setCapacidadeBasica(e.target.value)}
                        placeholder="Digite a capacidade básica do rolamento"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <span className="absolute right-3 top-3 text-gray-500 text-sm">N</span>
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={calcularRolamento}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      Calcular
                    </button>
                    <button
                      onClick={salvarCalculo}
                      disabled={!results}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Salvar</span>
                    </button>
                    <button
                      onClick={limparCampos}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                    >
                      Limpar
                    </button>
                  </div>
                </div>
              </div>

              {/* Painel de Resultados - Calculadora Básica */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-6 w-6 text-white" />
                    <h2 className="text-xl font-semibold text-white">Resultados dos Cálculos</h2>
                  </div>
                </div>
                
                <div className="p-6">
                  {!showResults ? (
                    <div className="text-center py-12">
                      <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                        <BarChart3 className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">Preencha os parâmetros e clique em "Calcular" para ver os resultados</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Vida Útil L10 */}
                      <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700">Vida Útil L₁₀</span>
                          <span className="text-blue-600 font-bold text-lg">
                            {results?.vidaUtil.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} horas
                          </span>
                        </div>
                      </div>

                      {/* Vida Nominal Lh */}
                      <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700">Vida Nominal (Lh)</span>
                          <span className="text-orange-600 font-bold text-lg">
                            {results?.vidaNominalHoras.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} horas
                          </span>
                        </div>
                      </div>

                      {/* Coeficiente da Vida */}
                      <div className="bg-cyan-50 rounded-lg p-4 border-l-4 border-cyan-500">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700">Coeficiente da Vida (fh)</span>
                          <span className="text-cyan-600 font-bold text-lg">
                            {results?.coeficienteVida.toFixed(3)}
                          </span>
                        </div>
                      </div>

                      {/* Capacidade de Carga Dinâmica */}
                      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700">Capacidade Dinâmica Necessária</span>
                          <span className="text-green-600 font-bold text-lg">
                            {results?.capacidadeCargaDinamica.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} N
                          </span>
                        </div>
                      </div>

                      {/* Fator de Velocidade */}
                      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700">Fator de Velocidade (Fn)</span>
                          <span className="text-yellow-600 font-bold text-lg">
                            {results?.fatorVelocidade.toFixed(3)}
                          </span>
                        </div>
                      </div>

                      {/* Potência de Atrito */}
                      <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700">Potência de Atrito</span>
                          <span className="text-purple-600 font-bold text-lg">
                            {results?.potenciaAtrito.toFixed(2)} W
                          </span>
                        </div>
                      </div>

                      {/* Temperatura de Operação */}
                      <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700">Temperatura Estimada</span>
                          <span className="text-red-600 font-bold text-lg">
                            {results?.temperaturaOperacao.toFixed(1)} °C
                          </span>
                        </div>
                      </div>

                      {/* Fator de Segurança */}
                      <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700">Fator de Segurança</span>
                          <span className="text-indigo-600 font-bold text-lg">
                            {results?.fatorSeguranca.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabela de Cálculos Salvos */}
            {savedCalculations.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Save className="h-6 w-6 text-white" />
                      <h2 className="text-xl font-semibold text-white">Tabela de Comparação - Cálculos Salvos</h2>
                    </div>
                    <button
                      onClick={() => setShowSavedTable(!showSavedTable)}
                      className="text-white hover:text-purple-200 transition-colors"
                    >
                      {showSavedTable ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>
                </div>
                
                {showSavedTable && (
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fr (N)</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N (rpm)</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C (N)</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lh (horas)</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">fh</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {savedCalculations.map((calc, index) => (
                            <tr key={calc.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {calc.timestamp.toLocaleString('pt-BR')}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                {calc.fr.toLocaleString('pt-BR')}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                {calc.n.toLocaleString('pt-BR')}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                {calc.tipoRolamento === 'esferas' ? 'Esferas' : 'Rolos'}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                {calc.capacidadeBasica.toLocaleString('pt-BR')}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-purple-600">
                                {calc.vidaNominalHoras.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-pink-600">
                                {calc.coeficienteVida.toFixed(3)}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                  onClick={() => removerCalculo(calc.id)}
                                  className="text-red-600 hover:text-red-800 transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-4 text-center text-sm text-gray-500">
                      Total de cálculos salvos: {savedCalculations.length}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Painel de Entrada - Seleção de Rolamentos */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-black to-gray-800 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <Search className="h-6 w-6 text-white" />
                  <h2 className="text-xl font-semibold text-white">Seleção Inteligente de Rolamentos</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Carga Radial */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Carga Radial (Fr) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={frSelection}
                        onChange={(e) => setFrSelection(e.target.value)}
                        placeholder="Carga radial"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                      />
                      <span className="absolute right-3 top-3 text-gray-500 text-sm">lb</span>
                    </div>
                  </div>

                  {/* Carga Axial */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Carga Axial (Fa)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={faSelection}
                        onChange={(e) => setFaSelection(e.target.value)}
                        placeholder="Carga axial (opcional)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                      />
                      <span className="absolute right-3 top-3 text-gray-500 text-sm">lb</span>
                    </div>
                  </div>

                  {/* Velocidade */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Velocidade (N) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={nSelection}
                        onChange={(e) => setNSelection(e.target.value)}
                        placeholder="Velocidade"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                      />
                      <span className="absolute right-3 top-3 text-gray-500 text-sm">rpm</span>
                    </div>
                  </div>

                  {/* Vida Útil de Projeto */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Vida Útil (L10h) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={l10hSelection}
                        onChange={(e) => setL10hSelection(e.target.value)}
                        placeholder="Vida útil"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                      />
                      <span className="absolute right-3 top-3 text-gray-500 text-sm">horas</span>
                    </div>
                  </div>

                  {/* Diâmetro Mínimo do Eixo */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Diâmetro Mínimo Eixo (D)
                    </label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <input
                          type="number"
                          value={shaftDiameter}
                          onChange={(e) => setShaftDiameter(e.target.value)}
                          placeholder="Diâmetro do eixo"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <select
                        value={diameterUnit}
                        onChange={(e) => setDiameterUnit(e.target.value as 'mm' | 'in')}
                        className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="mm">mm</option>
                        <option value="in">in</option>
                      </select>
                    </div>
                    {shaftDiameter && diameterUnit === 'in' && (
                      <p className="text-xs text-gray-500">
                        = {getShaftDiameterInMm().toFixed(2)} mm
                      </p>
                    )}
                  </div>

                  {/* Espaço vazio para alinhamento */}
                  <div></div>
                </div>

                {/* Botões */}
                <div className="flex space-x-4 pt-6">
                  <button
                    onClick={calcularSelecaoRolamento}
                    className="bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-900 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Calcular Seleção
                  </button>
                  <button
                    onClick={limparCampos}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Limpar
                  </button>
                </div>
              </div>
            </div>

            {/* Resultados da Seleção */}
            {showSelectionResults && selectionResults && (
              <div className="space-y-6">
                {/* Cálculos Intermediários */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-6 w-6 text-white" />
                      <h2 className="text-xl font-semibold text-white">Cálculos Intermediários</h2>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700">Vida em Milhões de Revoluções (L10)</span>
                          <span className="text-blue-600 font-bold text-lg">
                            {selectionResults.l10Revolutions.toFixed(2)} × 10⁶ rev
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          L10 = L10h × N × 60 / 10⁶
                        </p>
                      </div>

                      {selectionResults.equivalentLoad && (
                        <>
                          <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Carga Equivalente (Pe)</span>
                              <span className="text-purple-600 font-bold text-lg">
                                {selectionResults.equivalentLoad.toFixed(0)} lb
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                              Pe = X × Fr + Y × Fa
                            </p>
                          </div>

                          <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Fatores X e Y</span>
                              <span className="text-orange-600 font-bold text-lg">
                                X={selectionResults.xFactor?.toFixed(2)}, Y={selectionResults.yFactor?.toFixed(2)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                              Fa/Co = {selectionResults.faCoRatio?.toFixed(3)}
                            </p>
                          </div>
                        </>
                      )}

                      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700">Capacidade Dinâmica Requerida</span>
                          <span className="text-green-600 font-bold text-lg">
                            {selectionResults.requiredCapacity.toFixed(0)} lb
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          {selectionResults.equivalentLoad ? 'Creq = Pe × (L10)^(1/3)' : 'C = Fr × (L10)^(1/3)'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabela de Rolamentos */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Search className="h-6 w-6 text-white" />
                      <h2 className="text-xl font-semibold text-white">Rolamentos Adequados</h2>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <BearingTable 
                      requiredCapacity={selectionResults.requiredCapacity}
                      minShaftDiameter={getShaftDiameterInMm()}
                      onBearingSelect={handleBearingSelect}
                    />
                  </div>
                </div>

                {/* Rolamento Selecionado */}
                {selectionResults.selectedBearing && (
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-white" />
                        <h2 className="text-xl font-semibold text-white">Rolamento Selecionado</h2>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="bg-emerald-50 rounded-lg p-6 border-l-4 border-emerald-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-bold text-emerald-800 mb-4">
                              Rolamento {selectionResults.selectedBearing.number}
                            </h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Furo (d):</span>
                                <span className="text-gray-900">{selectionResults.selectedBearing.bore} mm</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Diâmetro Externo (D):</span>
                                <span className="text-gray-900">{selectionResults.selectedBearing.outsideDia} mm</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Largura (B):</span>
                                <span className="text-gray-900">{selectionResults.selectedBearing.width} mm</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">Características:</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Capacidade Dinâmica (C):</span>
                                <span className="text-emerald-600 font-bold">{selectionResults.selectedBearing.dynamicLoad} lb</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Capacidade Estática (Co):</span>
                                <span className="text-gray-900">{selectionResults.selectedBearing.staticLoad} lb</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Massa:</span>
                                <span className="text-gray-900">{selectionResults.selectedBearing.mass} lb</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Margem de Segurança:</span>
                                <span className="text-green-600 font-bold">
                                  {((selectionResults.selectedBearing.dynamicLoad / selectionResults.requiredCapacity - 1) * 100).toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Informações Técnicas */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 px-6 py-4">
            <div className="flex items-center space-x-3">
              <Info className="h-6 w-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Informações Técnicas</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Fórmulas da Calculadora Básica:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <strong>Vida Útil L₁₀:</strong> L₁₀ = (C/Fr)ᵖ</li>
                  <li>• <strong>Vida Nominal:</strong> Lh = 10⁶/(60×N) × (C/P)³</li>
                  <li>• <strong>Coeficiente da Vida:</strong> fh = (Lh/500)^(1/3)</li>
                  <li>• <strong>Expoente p:</strong> 3 para esferas, 10/3 para rolos</li>
                  <li>• <strong>Fator de Velocidade:</strong> Fn = (10⁶/(500×60×N))^(1/3)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Fórmulas da Seleção Avançada:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <strong>Conversão para Revoluções:</strong> L10 = L10h × N × 60 / 10⁶</li>
                  <li>• <strong>Capacidade Requerida Avançada:</strong> Creq = Pe × (L10)^(1/3)</li>
                  <li>• <strong>Carga Equivalente:</strong> Pe = X × Fr + Y × Fa</li>
                  <li>• <strong>Fatores X,Y:</strong> Fa/Co ≤ 0.014: X=1, Y=0; Fa/Co > 0.014: X=0.56, Y=1.2-2.0</li>
                  <li>• <strong>Conversão Diâmetro:</strong> D(mm) = D(in) × 25.4</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">Processo de Seleção Inteligente:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Filtragem por diâmetro mínimo do eixo (quando especificado)</li>
                  <li>• Seleção baseada na capacidade dinâmica requerida</li>
                  <li>• Priorização por séries: 6000 → 6200 → 6300</li>
                  <li>• Cálculo automático de fatores X e Y para cargas combinadas</li>
                </ul>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Margem de segurança recomendada: 20-50%</li>
                  <li>• Cálculos baseados em normas ISO 281</li>
                  <li>• Vida útil L₁₀ representa 90% de confiabilidade</li>
                  <li>• Suporte para cargas radiais e axiais combinadas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;