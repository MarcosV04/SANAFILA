# Arquitetura do Sistema — SANAFILA Campo Mourão

## 1. Visão Geral
O **SANAFILA** é uma plataforma inteligente projetada para otimizar a regulação de exames e consultas do SUS em Campo Mourão, integrando-se aos fluxos do e-SUS e SISREG. A arquitetura foi concebida sob o princípio de **baixo acoplamento e alta resiliência**, utilizando microsserviços isolados com estratégias de fallback baseadas em arquivos JSON locais para garantir operação contínua mesmo sob falhas de rede.

---

## 2. Divisão de Camadas (Microsserviços)

### 🔹 Camada de Inteligência e Motor Preditivo (`src/engine/`)
- **Tecnologia:** Python / FastAPI.
- **Responsabilidade:** Executa o algoritmo de priorização dinâmica com base no Protocolo de Manchester, fator etário, evolução clínica e histórico de faltas do paciente.
- **Endpoints Principais:**
  - `GET /queue`: Retorna a fila ordenada por prioridade preditiva.
  - `POST /recalculate`: Processa alterações clínicas ou novas confirmações/desistências e reordena a fila em tempo real.

### 🔹 Camada de Automação e Comunicação (`src/whatsapp/`)
- **Tecnologia:** Node.js / Webhook Engine.
- **Responsabilidade:** Gerencia as réguas ativas de engajamento (D-15, D-7, D-1), triagem interativa de sintomas e o gatilho de reclassificação automática de vagas ociosas.
- **Mecanismo de Resiliência:** Gravação de respostas em `data/mock_responses.json` com fallback para operação autônoma sem dependência estrita do backend em tempo de execução.

### 🔹 Camada de Gestão e Dashboard (`src/dashboard/`)
- **Tecnologia:** React / Next.js (Identidade visual institucional `#0c53a0`).
- **Responsabilidade:** Exibe painéis gerenciais em tempo real para a SESAU, monitorando KPIs de absenteísmo, vagas recuperadas e o saldo financeiro otimizado.

---

## 3. Fluxo de Dados e Resiliência (Estratégia de Fallback)
1. **Ambiente Isolado (Sprint 1):** Os componentes consomem diretamente a base estática `data/mock_patients.json`.
2. **Ambiente Integrado (Sprint 3):** O Dashboard consome a API do motor em Python (`/queue`), mantendo o arquivo estático como mecanismo de *fallback* automático em caso de indisponibilidade momentânea do servidor.

---

## 4. Conformidade e Segurança (LGPD)
O SANAFILA foi arquitetado em estrita conformidade com a **Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)**:
- **Minimização de Dados:** Apenas os metadados estritamente necessários para o agendamento e contato via WhatsApp são processados.
- **Criptografia:** Tráfego de dados protegido por protocolos criptográficos padrão de mercado (`HTTPS/TLS`).
- **Anonimização:** Logs de auditoria gerados para o painel gerencial ocultam dados sensíveis de prontuário, exibindo apenas indicadores agregados e identificadores anonimizados para a gestão.