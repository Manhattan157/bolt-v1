import React from 'react';

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

// Complete bearing data from the tables provided
const bearingData: BearingData[] = [
  { number: '6000', bore: 10, outsideDia: 26, width: 8, staticLoad: 441, dynamicLoad: 1039, maxFilletRadius: 0.3, minShaftDia: 12, maxHousingDia: 24, mass: 0.042 },
  { number: '6200', bore: 10, outsideDia: 30, width: 9, staticLoad: 531, dynamicLoad: 1140, maxFilletRadius: 0.6, minShaftDia: 14, maxHousingDia: 26, mass: 0.071 },
  { number: '6300', bore: 10, outsideDia: 35, width: 11, staticLoad: 1812, dynamicLoad: 764, maxFilletRadius: 0.6, minShaftDia: 14, maxHousingDia: 31, mass: 0.117 },
  { number: '6001', bore: 12, outsideDia: 28, width: 8, staticLoad: 531, dynamicLoad: 1140, maxFilletRadius: 0.3, minShaftDia: 14, maxHousingDia: 26, mass: 0.049 },
  { number: '6201', bore: 12, outsideDia: 32, width: 10, staticLoad: 697, dynamicLoad: 1549, maxFilletRadius: 0.6, minShaftDia: 16, maxHousingDia: 28, mass: 0.082 },
  { number: '6301', bore: 12, outsideDia: 37, width: 12, staticLoad: 933, dynamicLoad: 2192, maxFilletRadius: 1.0, minShaftDia: 17, maxHousingDia: 32, mass: 0.132 },
  { number: '6002', bore: 15, outsideDia: 32, width: 9, staticLoad: 641, dynamicLoad: 1257, maxFilletRadius: 0.3, minShaftDia: 17, maxHousingDia: 30, mass: 0.066 },
  { number: '6202', bore: 15, outsideDia: 35, width: 11, staticLoad: 843, dynamicLoad: 1754, maxFilletRadius: 0.6, minShaftDia: 19, maxHousingDia: 31, mass: 0.099 },
  { number: '6302', bore: 15, outsideDia: 42, width: 13, staticLoad: 1214, dynamicLoad: 2563, maxFilletRadius: 1.0, minShaftDia: 20, maxHousingDia: 37, mass: 0.181 },
  { number: '6003', bore: 17, outsideDia: 35, width: 10, staticLoad: 731, dynamicLoad: 1360, maxFilletRadius: 0.3, minShaftDia: 19, maxHousingDia: 33, mass: 0.086 },
  { number: '6203', bore: 17, outsideDia: 40, width: 12, staticLoad: 1068, dynamicLoad: 2149, maxFilletRadius: 0.6, minShaftDia: 21, maxHousingDia: 36, mass: 0.143 },
  { number: '6303', bore: 17, outsideDia: 47, width: 14, staticLoad: 1473, dynamicLoad: 3035, maxFilletRadius: 1.0, minShaftDia: 22, maxHousingDia: 42, mass: 0.265 },
  { number: '6004', bore: 20, outsideDia: 42, width: 12, staticLoad: 1124, dynamicLoad: 2104, maxFilletRadius: 0.6, minShaftDia: 24, maxHousingDia: 38, mass: 0.152 },
  { number: '6204', bore: 20, outsideDia: 47, width: 14, staticLoad: 1473, dynamicLoad: 2855, maxFilletRadius: 1.0, minShaftDia: 25, maxHousingDia: 42, mass: 0.243 },
  { number: '6304', bore: 20, outsideDia: 52, width: 15, staticLoad: 1754, dynamicLoad: 3575, maxFilletRadius: 1.0, minShaftDia: 27, maxHousingDia: 45, mass: 0.309 },
  { number: '6005', bore: 25, outsideDia: 47, width: 12, staticLoad: 1473, dynamicLoad: 2518, maxFilletRadius: 0.6, minShaftDia: 29, maxHousingDia: 43, mass: 0.176 },
  { number: '6205', bore: 25, outsideDia: 52, width: 15, staticLoad: 1754, dynamicLoad: 3147, maxFilletRadius: 1.0, minShaftDia: 30, maxHousingDia: 47, mass: 0.287 },
  { number: '6305', bore: 25, outsideDia: 62, width: 17, staticLoad: 2608, dynamicLoad: 5058, maxFilletRadius: 1.0, minShaftDia: 32, maxHousingDia: 55, mass: 0.507 },
  { number: '6006', bore: 30, outsideDia: 55, width: 13, staticLoad: 1866, dynamicLoad: 2990, maxFilletRadius: 1.0, minShaftDia: 35, maxHousingDia: 50, mass: 0.353 },
  { number: '6206', bore: 30, outsideDia: 62, width: 16, staticLoad: 2518, dynamicLoad: 4384, maxFilletRadius: 1.0, minShaftDia: 35, maxHousingDia: 57, mass: 0.441 },
  { number: '6306', bore: 30, outsideDia: 72, width: 19, staticLoad: 3597, dynamicLoad: 6317, maxFilletRadius: 1.0, minShaftDia: 37, maxHousingDia: 65, mass: 0.772 },
  { number: '6007', bore: 35, outsideDia: 62, width: 14, staticLoad: 2293, dynamicLoad: 3575, maxFilletRadius: 1.0, minShaftDia: 40, maxHousingDia: 57, mass: 0.353 },
  { number: '6207', bore: 35, outsideDia: 72, width: 17, staticLoad: 3440, dynamicLoad: 5733, maxFilletRadius: 1.0, minShaftDia: 42, maxHousingDia: 65, mass: 0.639 },
  { number: '6307', bore: 35, outsideDia: 80, width: 21, staticLoad: 4272, dynamicLoad: 7464, maxFilletRadius: 1.5, minShaftDia: 43, maxHousingDia: 72, mass: 1.014 },
  { number: '6008', bore: 40, outsideDia: 68, width: 15, staticLoad: 2608, dynamicLoad: 3777, maxFilletRadius: 1.0, minShaftDia: 45, maxHousingDia: 63, mass: 0.419 },
  { number: '6208', bore: 40, outsideDia: 80, width: 18, staticLoad: 4272, dynamicLoad: 6902, maxFilletRadius: 1.0, minShaftDia: 47, maxHousingDia: 73, mass: 0.816 },
  { number: '6308', bore: 40, outsideDia: 90, width: 23, staticLoad: 5396, dynamicLoad: 9218, maxFilletRadius: 1.5, minShaftDia: 48, maxHousingDia: 82, mass: 1.389 },
  { number: '6009', bore: 45, outsideDia: 75, width: 16, staticLoad: 3282, dynamicLoad: 4676, maxFilletRadius: 1.0, minShaftDia: 50, maxHousingDia: 70, mass: 0.551 },
  { number: '6209', bore: 45, outsideDia: 85, width: 19, staticLoad: 4856, dynamicLoad: 7464, maxFilletRadius: 1.0, minShaftDia: 52, maxHousingDia: 78, mass: 0.904 },
  { number: '6309', bore: 45, outsideDia: 100, width: 25, staticLoad: 7082, dynamicLoad: 11848, maxFilletRadius: 1.5, minShaftDia: 53, maxHousingDia: 92, mass: 1.830 },
  { number: '6010', bore: 50, outsideDia: 80, width: 16, staticLoad: 3597, dynamicLoad: 4856, maxFilletRadius: 1.0, minShaftDia: 55, maxHousingDia: 75, mass: 0.573 },
  { number: '6210', bore: 50, outsideDia: 90, width: 20, staticLoad: 5216, dynamicLoad: 7891, maxFilletRadius: 1.0, minShaftDia: 57, maxHousingDia: 83, mass: 1.014 },
  { number: '6310', bore: 50, outsideDia: 110, width: 27, staticLoad: 8543, dynamicLoad: 13894, maxFilletRadius: 2.0, minShaftDia: 59, maxHousingDia: 101, mass: 2.315 },
  { number: '6011', bore: 55, outsideDia: 90, width: 18, staticLoad: 4766, dynamicLoad: 6317, maxFilletRadius: 1.0, minShaftDia: 62, maxHousingDia: 83, mass: 0.860 },
  { number: '6211', bore: 55, outsideDia: 100, width: 21, staticLoad: 6520, dynamicLoad: 9802, maxFilletRadius: 1.5, minShaftDia: 63, maxHousingDia: 92, mass: 1.345 },
  { number: '6311', bore: 55, outsideDia: 120, width: 29, staticLoad: 10117, dynamicLoad: 16075, maxFilletRadius: 2.0, minShaftDia: 64, maxHousingDia: 111, mass: 2.977 },
  { number: '6012', bore: 60, outsideDia: 95, width: 18, staticLoad: 5216, dynamicLoad: 6655, maxFilletRadius: 1.0, minShaftDia: 67, maxHousingDia: 88, mass: 0.926 },
  { number: '6212', bore: 60, outsideDia: 110, width: 22, staticLoad: 7307, dynamicLoad: 10679, maxFilletRadius: 1.5, minShaftDia: 68, maxHousingDia: 102, mass: 1.720 },
  { number: '6312', bore: 60, outsideDia: 130, width: 31, staticLoad: 11691, dynamicLoad: 18413, maxFilletRadius: 2.0, minShaftDia: 71, maxHousingDia: 119, mass: 3.749 },
  { number: '6013', bore: 65, outsideDia: 100, width: 18, staticLoad: 5621, dynamicLoad: 6902, maxFilletRadius: 1.0, minShaftDia: 72, maxHousingDia: 93, mass: 0.970 },
  { number: '6213', bore: 65, outsideDia: 120, width: 23, staticLoad: 9105, dynamicLoad: 12567, maxFilletRadius: 1.5, minShaftDia: 73, maxHousingDia: 112, mass: 2.183 },
  { number: '6313', bore: 65, outsideDia: 140, width: 33, staticLoad: 13489, dynamicLoad: 20751, maxFilletRadius: 2.0, minShaftDia: 76, maxHousingDia: 129, mass: 4.631 },
  { number: '6014', bore: 70, outsideDia: 110, width: 20, staticLoad: 6969, dynamicLoad: 8476, maxFilletRadius: 1.0, minShaftDia: 77, maxHousingDia: 103, mass: 1.323 },
  { number: '6214', bore: 70, outsideDia: 125, width: 24, staticLoad: 10117, dynamicLoad: 13602, maxFilletRadius: 1.5, minShaftDia: 78, maxHousingDia: 117, mass: 2.315 },
  { number: '6314', bore: 70, outsideDia: 150, width: 35, staticLoad: 15288, dynamicLoad: 23381, maxFilletRadius: 2.0, minShaftDia: 81, maxHousingDia: 139, mass: 5.513 },
  { number: '6015', bore: 75, outsideDia: 115, width: 20, staticLoad: 7531, dynamicLoad: 8925, maxFilletRadius: 1.0, minShaftDia: 82, maxHousingDia: 108, mass: 1.411 },
  { number: '6215', bore: 75, outsideDia: 130, width: 25, staticLoad: 11016, dynamicLoad: 14906, maxFilletRadius: 1.5, minShaftDia: 83, maxHousingDia: 122, mass: 2.646 },
  { number: '6315', bore: 75, outsideDia: 160, width: 37, staticLoad: 17199, dynamicLoad: 25629, maxFilletRadius: 2.0, minShaftDia: 86, maxHousingDia: 149, mass: 6.615 },
  { number: '6016', bore: 80, outsideDia: 125, width: 22, staticLoad: 8993, dynamicLoad: 10679, maxFilletRadius: 1.0, minShaftDia: 87, maxHousingDia: 118, mass: 1.874 },
  { number: '6216', bore: 80, outsideDia: 140, width: 26, staticLoad: 12365, dynamicLoad: 15782, maxFilletRadius: 2.0, minShaftDia: 89, maxHousingDia: 131, mass: 3.087 },
  { number: '6316', bore: 80, outsideDia: 170, width: 39, staticLoad: 19447, dynamicLoad: 27878, maxFilletRadius: 2.0, minShaftDia: 91, maxHousingDia: 159, mass: 7.718 },
  { number: '6017', bore: 85, outsideDia: 130, width: 22, staticLoad: 9667, dynamicLoad: 11106, maxFilletRadius: 1.0, minShaftDia: 92, maxHousingDia: 123, mass: 1.962 },
  { number: '6217', bore: 85, outsideDia: 150, width: 28, staticLoad: 14388, dynamicLoad: 18705, maxFilletRadius: 2.0, minShaftDia: 94, maxHousingDia: 141, mass: 3.969 },
  { number: '6317', bore: 85, outsideDia: 180, width: 41, staticLoad: 21695, dynamicLoad: 29901, maxFilletRadius: 2.5, minShaftDia: 98, maxHousingDia: 167, mass: 9.371 },
  { number: '6018', bore: 90, outsideDia: 140, width: 24, staticLoad: 11241, dynamicLoad: 13152, maxFilletRadius: 1.5, minShaftDia: 98, maxHousingDia: 132, mass: 2.536 },
  { number: '6218', bore: 90, outsideDia: 160, width: 30, staticLoad: 16524, dynamicLoad: 21493, maxFilletRadius: 2.0, minShaftDia: 99, maxHousingDia: 151, mass: 4.741 },
  { number: '6318', bore: 90, outsideDia: 190, width: 43, staticLoad: 24281, dynamicLoad: 32149, maxFilletRadius: 2.5, minShaftDia: 103, maxHousingDia: 177, mass: 10.805 },
  { number: '6019', bore: 95, outsideDia: 145, width: 24, staticLoad: 12140, dynamicLoad: 13602, maxFilletRadius: 1.5, minShaftDia: 103, maxHousingDia: 137, mass: 2.646 },
  { number: '6219', bore: 95, outsideDia: 170, width: 32, staticLoad: 18323, dynamicLoad: 24281, maxFilletRadius: 2.0, minShaftDia: 106, maxHousingDia: 159, mass: 5.733 },
  { number: '6319', bore: 95, outsideDia: 200, width: 45, staticLoad: 26529, dynamicLoad: 34397, maxFilletRadius: 2.5, minShaftDia: 108, maxHousingDia: 187, mass: 12.458 },
  { number: '6020', bore: 100, outsideDia: 150, width: 24, staticLoad: 12140, dynamicLoad: 13602, maxFilletRadius: 1.5, minShaftDia: 108, maxHousingDia: 142, mass: 2.756 },
  { number: '6220', bore: 100, outsideDia: 180, width: 34, staticLoad: 20908, dynamicLoad: 27878, maxFilletRadius: 2.0, minShaftDia: 111, maxHousingDia: 169, mass: 6.946 },
  { number: '6320', bore: 100, outsideDia: 215, width: 47, staticLoad: 31475, dynamicLoad: 39119, maxFilletRadius: 2.5, minShaftDia: 113, maxHousingDia: 202, mass: 15.435 },
  { number: '6021', bore: 105, outsideDia: 160, width: 26, staticLoad: 14726, dynamicLoad: 16367, maxFilletRadius: 2.0, minShaftDia: 114, maxHousingDia: 151, mass: 3.528 },
  { number: '6221', bore: 105, outsideDia: 190, width: 36, staticLoad: 23381, dynamicLoad: 29901, maxFilletRadius: 2.0, minShaftDia: 116, maxHousingDia: 179, mass: 8.159 },
  { number: '6321', bore: 105, outsideDia: 225, width: 49, staticLoad: 34397, dynamicLoad: 40917, maxFilletRadius: 2.5, minShaftDia: 118, maxHousingDia: 212, mass: 18.191 },
  { number: '6022', bore: 110, outsideDia: 170, width: 28, staticLoad: 16524, dynamicLoad: 18413, maxFilletRadius: 2.0, minShaftDia: 119, maxHousingDia: 161, mass: 4.300 },
  { number: '6222', bore: 110, outsideDia: 200, width: 38, staticLoad: 26529, dynamicLoad: 32149, maxFilletRadius: 2.0, minShaftDia: 121, maxHousingDia: 189, mass: 9.592 },
  { number: '6322', bore: 110, outsideDia: 240, width: 50, staticLoad: 40468, dynamicLoad: 45638, maxFilletRadius: 2.5, minShaftDia: 123, maxHousingDia: 227, mass: 21.058 },
  { number: '6024', bore: 120, outsideDia: 180, width: 28, staticLoad: 17985, dynamicLoad: 19155, maxFilletRadius: 2.0, minShaftDia: 129, maxHousingDia: 171, mass: 4.520 },
  { number: '6224', bore: 120, outsideDia: 215, width: 40, staticLoad: 26529, dynamicLoad: 32824, maxFilletRadius: 2.0, minShaftDia: 131, maxHousingDia: 204, mass: 11.356 },
  { number: '6324', bore: 120, outsideDia: 260, width: 55, staticLoad: 41817, dynamicLoad: 46763, maxFilletRadius: 2.5, minShaftDia: 133, maxHousingDia: 247, mass: 31.973 },
  { number: '6026', bore: 130, outsideDia: 200, width: 33, staticLoad: 22482, dynamicLoad: 23891, maxFilletRadius: 2.0, minShaftDia: 139, maxHousingDia: 191, mass: 6.946 },
  { number: '6226', bore: 130, outsideDia: 230, width: 40, staticLoad: 29676, dynamicLoad: 35072, maxFilletRadius: 2.0, minShaftDia: 143, maxHousingDia: 217, mass: 12.789 },
  { number: '6326', bore: 130, outsideDia: 280, width: 58, staticLoad: 48561, dynamicLoad: 51484, maxFilletRadius: 3.0, minShaftDia: 146, maxHousingDia: 264, mass: 39.690 }
];

interface BearingTableProps {
  requiredCapacity: number;
  minShaftDiameter?: number;
  onBearingSelect: (bearing: BearingData) => void;
}

export const BearingTable: React.FC<BearingTableProps> = ({ 
  requiredCapacity, 
  minShaftDiameter = 0, 
  onBearingSelect 
}) => {
  // Filter bearings based on criteria
  let suitableBearings = bearingData.filter(bearing => {
    // Must meet required capacity
    const meetsCapacity = bearing.dynamicLoad >= requiredCapacity;
    
    // Must meet minimum shaft diameter if specified
    const meetsShaftDiameter = minShaftDiameter === 0 || bearing.bore >= minShaftDiameter;
    
    return meetsCapacity && meetsShaftDiameter;
  });
  
  // Intelligent sorting: prioritize series 6000 → 6200 → 6300, then by capacity
  const getSeries = (bearingNumber: string): number => {
    if (bearingNumber.startsWith('60')) return 1; // 6000 series
    if (bearingNumber.startsWith('62')) return 2; // 6200 series
    if (bearingNumber.startsWith('63')) return 3; // 6300 series
    return 4; // Other series
  };
  
  const sortedBearings = suitableBearings.sort((a, b) => {
    // First, sort by series priority
    const seriesA = getSeries(a.number);
    const seriesB = getSeries(b.number);
    
    if (seriesA !== seriesB) {
      return seriesA - seriesB;
    }
    
    // Within same series, sort by dynamic load capacity (ascending)
    return a.dynamicLoad - b.dynamicLoad;
  });
  
  // Find the best recommendation (first suitable bearing with good margin)
  const bestRecommendation = sortedBearings.find(bearing => {
    const margin = ((bearing.dynamicLoad / requiredCapacity - 1) * 100);
    return margin >= 20 && margin <= 50;
  }) || sortedBearings[0];
  
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Critérios de Seleção</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-blue-700">
              <strong>Capacidade Dinâmica:</strong> C ≥ {requiredCapacity.toFixed(0)} lb
            </p>
            {minShaftDiameter > 0 && (
              <p className="text-blue-700">
                <strong>Diâmetro do Furo:</strong> d ≥ {minShaftDiameter.toFixed(1)} mm
              </p>
            )}
          </div>
          <div>
            <p className="text-blue-700">
              <strong>Prioridade:</strong> Séries 6000 → 6200 → 6300
            </p>
            <p className="text-blue-700">
              <strong>Margem Ideal:</strong> 20-50% de segurança
            </p>
          </div>
        </div>
      </div>
      
      {sortedBearings.length > 0 ? (
        <div className="space-y-4">
          {/* Best Recommendation Highlight */}
          {bestRecommendation && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-green-800">🏆 Recomendação Principal</h4>
                <button
                  onClick={() => onBearingSelect(bestRecommendation)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
                >
                  Selecionar Recomendado
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Rolamento:</span>
                  <span className="ml-2 font-bold text-green-800">{bestRecommendation.number}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Furo:</span>
                  <span className="ml-2 text-gray-900">{bestRecommendation.bore} mm</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Capacidade:</span>
                  <span className="ml-2 font-bold text-green-600">{bestRecommendation.dynamicLoad} lb</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Margem:</span>
                  <span className="ml-2 font-bold text-green-600">
                    +{((bestRecommendation.dynamicLoad / requiredCapacity - 1) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Full Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rolamento</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Série</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Furo (mm)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diâm. Ext. (mm)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Largura (mm)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C (lb)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Co (lb)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margem (%)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Massa (lb)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedBearings.slice(0, 15).map((bearing, index) => {
                  const margin = ((bearing.dynamicLoad / requiredCapacity - 1) * 100);
                  const isOptimal = margin >= 20 && margin <= 50;
                  const isBestRecommendation = bearing.number === bestRecommendation?.number;
                  const series = bearing.number.substring(0, 2) + '00';
                  
                  return (
                    <tr 
                      key={bearing.number} 
                      className={`
                        ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} 
                        ${isBestRecommendation ? 'ring-2 ring-green-300 bg-green-50' : isOptimal ? 'ring-1 ring-green-200' : ''}
                      `}
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {bearing.number}
                        {isBestRecommendation && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">★ Melhor</span>}
                        {isOptimal && !isBestRecommendation && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Recomendado</span>}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          series === '6000' ? 'bg-blue-100 text-blue-800' :
                          series === '6200' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {series}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{bearing.bore}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{bearing.outsideDia}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{bearing.width}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{bearing.dynamicLoad.toLocaleString()}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{bearing.staticLoad.toLocaleString()}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`font-medium ${
                          margin < 20 ? 'text-orange-600' : 
                          margin > 50 ? 'text-blue-600' : 
                          'text-green-600'
                        }`}>
                          +{margin.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{bearing.mass.toFixed(3)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => onBearingSelect(bearing)}
                          className={`px-3 py-1 rounded-md text-xs transition-colors ${
                            isBestRecommendation
                              ? 'bg-green-600 text-white hover:bg-green-700' 
                              : isOptimal 
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-600 text-white hover:bg-gray-700'
                          }`}
                        >
                          Selecionar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {sortedBearings.length > 15 && (
              <div className="mt-4 text-center text-sm text-gray-500">
                Mostrando os 15 primeiros rolamentos adequados de {sortedBearings.length} opções disponíveis
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2">Nenhum Rolamento Adequado</h4>
          <div className="space-y-2 text-red-700">
            <p>
              Nenhum rolamento da tabela atende aos critérios especificados:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Capacidade dinâmica requerida: {requiredCapacity.toFixed(0)} lb</li>
              {minShaftDiameter > 0 && (
                <li>Diâmetro mínimo do furo: {minShaftDiameter.toFixed(1)} mm</li>
              )}
            </ul>
            <p className="text-sm text-red-600 mt-2">
              Considere revisar os parâmetros de entrada ou consultar rolamentos de séries superiores.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};