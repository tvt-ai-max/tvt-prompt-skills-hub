---
id: meta-ads-scaling-and-budget-controller
title: "Meta Ads Scaling & Budget Governance Controller"
description: "Meta Ads Scaling & Budget Governance Controller — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent."
category: marketing
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["Meta Ads", "Scaling Rules", "Budget Control", "Performance Marketing", "Risk Governance"]
inputs:
  - name: account_id
    type: string
    description: "Mã tài khoản quảng cáo (hoặc nhãn đối soát)"
    required: true
  - name: current_roas
    type: string
    description: "Chỉ số ROAS / CPA hiện tại trong 7 ngày gần nhất"
    required: true
  - name: target_scaling_action
    type: string
    description: "Hành động dự kiến (Tăng ngân sách 20%, Nhân nhóm, Cắt lỗ)"
    required: true
audit_gates: ["Budget Cap Approval Gate", "Statistical Anomaly Gate (2-sigma)", "Strict ROAS Floor Gate"]
tools: ["read_file", "web_search"]
created_at: "2026-11-03"
---
# Facebook Ads Manager

## Objetivo

Executar campanhas Meta Ads ponta a ponta com disciplina operacional:
- planejar,
- criar estruturas,
- diagnosticar performance,
- escalar com regras matematicas,
- operar audiencias e criativos,
- sempre com controle de risco.

## Como usar esta skill sem inflar contexto

1. Use este `SKILL.md` como roteador.
2. Carregue `{baseDir}/references/tools-index.md` para escolher tools exatas.
3. Carregue apenas a referencia adicional necessaria para a tarefa:
   - targeting -> `{baseDir}/references/targeting-reference.md`
   - diagnostico -> `{baseDir}/references/diagnostics-reference.md`
   - escala -> `{baseDir}/references/scaling-rules.md`
   - criativos -> `{baseDir}/references/creative-frameworks.md`
   - seguranca -> `{baseDir}/references/safety-policy.md`
4. Siga um workflow em `{baseDir}/workflows/`.
5. Execute checklists em `{baseDir}/checklists/` antes e depois de escrita.

## Regras nao negociaveis

- Criacoes devem usar status `PAUSED` por padrao.
- Nunca executar delete sem confirmacao explicita do usuario.
- Mudanca de budget agressiva e proibida sem validacao de risco.
- Nao inventar nome de tool: usar nomes exatos de `{baseDir}/references/tools-index.md`.
- Sempre tratar `act_id` no formato `act_<id>`.
- Em listas paginadas, seguir `paging.next` com `fetch_pagination_url`.

## Roteamento rapido por intencao

- Planejar conta e baseline -> `{baseDir}/workflows/01-plan-and-launch.md`
- Diagnosticar queda ou baixa entrega -> `{baseDir}/workflows/02-diagnose-and-optimize.md`
- Trabalhar CRM, custom e lookalike -> `{baseDir}/workflows/03-audience-crm-and-lookalike.md`
- Rotina diaria de operacao e escala -> `{baseDir}/workflows/04-daily-operations.md`

## Contrato de resposta

Para tarefas operacionais, responder com:
1. Objetivo e hipotese.
2. Plano de execucao com tools exatas.
3. Acoes feitas e IDs impactados.
4. Proximos passos e monitoramento.
5. Risco e rollback quando houver escrita.

## Anti-patterns

- Nao carregar todas as referencias de uma vez.
- Nao usar pseudo-tools (`update_x`, `delete_x`).
- Nao ativar campanha/adset/ad sem validacao minima.
- Nao otimizar por metrica unica ignorando funil.

## Tham Số Đầu Vào Của Kỹ Năng
- **account_id** (Mã tài khoản quảng cáo (hoặc nhãn đối soát)): `{{account_id}}`
- **current_roas** (Chỉ số ROAS / CPA hiện tại trong 7 ngày gần nhất): `{{current_roas}}`
- **target_scaling_action** (Hành động dự kiến (Tăng ngân sách 20%, Nhân nhóm, Cắt lỗ)): `{{target_scaling_action}}`

