import { useState, useEffect } from 'react';
import mockData from '../../../data/mock_patients.json';

export default function SANAFILADashboard() {
  const [patients, setPatients] = useState([]);
  const [kpis, setKpis] = useState({ total: 0, confirmados: 0, pendentes: 0 });

  useEffect(() => {
    setPatients(mockData);
    setKpis({
      total: mockData.length,
      confirmados: mockData.filter(p => p.status_vaga === 'confirmado').length,
      pendentes: mockData.filter(p => p.status_vaga === 'pendente').length,
    });
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#0c53a0', color: 'white', padding: '20px', borderRadius: '8px' }}>
        <h1 style={{ margin: 0 }}>SANAFILA Campo Mourão - Gestão SESAU</h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.9 }}>Painel de Controle e Regulação Dinâmica de Filas</p>
      </header>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ padding: '20px', background: 'white', border: '1px solid #ddd', borderRadius: '8px', flex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#555' }}>Total na Fila</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#0c53a0' }}>{kpis.total}</p>
        </div>
        <div style={{ padding: '20px', background: 'white', border: '1px solid #ddd', borderRadius: '8px', flex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#555' }}>Vagas Confirmadas</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#2e7d32' }}>{kpis.confirmados}</p>
        </div>
        <div style={{ padding: '20px', background: 'white', border: '1px solid #ddd', borderRadius: '8px', flex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#555' }}>Vagas Pendentes (Risco)</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#ed6c02' }}>{kpis.pendentes}</p>
        </div>
      </div>

      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginTop: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h2 style={{ marginTop: 0, color: '#0c53a0' }}>Fila Dinâmica de Regulação</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Paciente</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>UBS</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Especialidade</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Score</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id}>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{p.nome} ({p.idade} anos)</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{p.ubs}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{p.especialidade}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>{p.score_prioridade}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px',
                    backgroundColor: p.status_vaga === 'confirmado' ? '#e8f5e9' : '#fff3e0',
                    color: p.status_vaga === 'confirmado' ? '#2e7d32' : '#ed6c02'
                  }}>
                    {p.status_vaga}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}