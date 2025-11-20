// src/config/steps.ts
import { Step } from "@/types/steps";

export const steps: Step[] = [
  {
    id: "intro_promise",
    kind: "intro",
    title: "Você está a um passo de blindar sua operação...",
    subtitle:
      "Entrando em uma comunidade exclusiva com players que se antecipam dos bloqueios e escalam sem medo no direct response!",
  },
  {
    id: "q_name",
    kind: "text",
    title: "Seja bem-vindo, qual seu nome?*",
    fieldName: "name",
    required: true,
  },
  {
    id: "q_whatsapp",
    kind: "phone",
    title: "Em qual WhatsApp posso falar com você caso seja selecionado(a)?*",
    fieldName: "whatsapp",
    required: true,
  },
  {
    id: "story_problem",
    kind: "content",
    title:
      "Já teve seu resultado travado no Google, por causa de um bloqueio que você não sabe resolver?",
    subtitle: "Essa é a história de muitos que chegam até aqui...",
    paragraphs: [
      "Eu sei como é. Aquele medo de acordar no final de semana, dia de bater escalar, e descobrir que sua operação de vendas parou por um bloqueio que você nem entende direito.",
      "Você sente que passa 80% do seu tempo em atividades de defesa, apagando incêndios, e só 20% no ataque, que é o que realmente faz seu negócio crescer.",
      "No BANDO, nós não oferecemos soluções mágicas ou hacks que falham na primeira tentativa de escala. Nós te entregamos o mapa para você se tornar um faixa-preta da contingência.",
    ],
  },
  {
    id: "intro_structure",
    kind: "intro",
    title:
      "Agora vamos conhecer um pouco mais da sua estrutura e entender o nível de blindagem...",
  },
  {
    id: "q_main_challenge",
    kind: "text",
    title:
      "Qual é o maior desafio que você enfrenta hoje com bloqueios ou estrutura de contingência?*",
    fieldName: "main_challenge",
    required: true,
    multiline: true,
  },
  {
    id: "q_reaction",
    kind: "choice",
    title:
      "Pra entender onde você está no jogo... Quando sua estrutura é bloqueada, o que você costuma fazer?*",
    fieldName: "reaction_to_block",
    options: [
      { value: "wait_and_new_account", label: "Espero alguns dias e crio uma conta nova" },
      { value: "support_appeal", label: "Tento resolver com suporte / apelo" },
      { value: "ask_expert", label: "Peço ajuda pra alguém que entende de contingência" },
      { value: "structured_process", label: "Tenho um processo estruturado pra contornar" },
      { value: "dont_know", label: "Não sei o que fazer" },
    ],
  },
  {
    id: "q_control_level",
    kind: "scale",
    title:
      "Sinceramente... Em uma escala de 1 a 5, quanto você sente que tem controle sobre os bloqueios das suas campanhas?*",
    subtitle: "(Escala de 1 = zero controle, 5 = total controle)",
    fieldName: "control_level",
    min: 1,
    max: 5,
  },
  {
    id: "content_pillars",
    kind: "content",
    title:
      "NO BANDO VOCÊ ENCONTRA OS PILARES QUE VÃO MANTER SUA OPERAÇÃO BLINDADA!",
    paragraphs: [
      "Networking Estratégico: comunidade de operadores que compartilham testes, insights e estruturas que mantêm campanhas vivas.",
      "Suporte Direto: acesso ao Camaleão e membros experientes pra destravar o que estiver travando sua operação.",
      "Conteúdos Gravados: módulo avançado de contingência, aulas sobre fundamentos, pesquisa, YouTube Ads e atualizações constantes.",
      "Calls ao Vivo: hotseats mensais para revisar operação, corrigir gargalos e ajustar sua estrutura.",
      "Calls com Convidados: especialistas convidados ampliando sua visão sobre contingência e tráfego avançado.",
    ],
  },
  {
    id: "final_offer",
    kind: "finalChoice",
    title:
      "Se você chegou até aqui, já percebeu que o Bando não é apenas mais uma comunidade sobre tráfego.",
    // você pode adicionar mais texto depois, por enquanto use só a pergunta de fit:
    fieldName: "final_fit",
    options: [
      { value: "yes", label: "Faz sentido!" },
      { value: "no", label: "No momento não!" },
    ],
  },
];
