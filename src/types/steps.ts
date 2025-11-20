// src/types/steps.ts
export type StepKind =
  | "intro"
  | "text"
  | "phone"
  | "choice"
  | "scale"
  | "content"
  | "finalChoice";

export type StepId =
  | "intro_promise"
  | "q_name"
  | "q_whatsapp"
  | "story_problem"
  | "intro_structure"
  | "q_main_challenge"
  | "q_reaction"
  | "q_control_level"
  | "content_pillars"
  | "final_offer";

interface BaseStep {
  id: StepId;
  kind: StepKind;
}

export interface IntroStep extends BaseStep {
  kind: "intro";
  title: string;
  subtitle?: string;
}

export interface TextStep extends BaseStep {
  kind: "text" | "phone";
  title: string;
  fieldName: keyof Answers;
  required?: boolean;
  multiline?: boolean;
}

export interface ChoiceOption {
  value: string;
  label: string;
}

export interface ChoiceStep extends BaseStep {
  kind: "choice" | "finalChoice";
  title: string;
  fieldName: keyof Answers;
  options: ChoiceOption[];
}

export interface ScaleStep extends BaseStep {
  kind: "scale";
  title: string;
  subtitle?: string;
  fieldName: keyof Answers;
  min: number;
  max: number;
}

export interface ContentStep extends BaseStep {
  kind: "content";
  title: string;
  subtitle?: string;
  paragraphs: string[];
}

export type Step =
  | IntroStep
  | TextStep
  | ChoiceStep
  | ScaleStep
  | ContentStep;

export type Answers = {
  name?: string;
  whatsapp?: string;
  main_challenge?: string;
  reaction_to_block?: string;
  control_level?: number;
  final_fit?: string;
};
