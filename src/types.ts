export interface SystemFeature {
  id: string;
  title: string;
  description: string;
}

export interface ComparisonItem {
  id: string;
  title: string;
  subtitle?: string;
}

export interface PromptItem {
  id: string;
  family: string;
  hazard: string;
  text: string;
  decodedText?: string;
}

export interface VarianceFront {
  id: number;
  name: string;
  mechanism: string;
  failureMode: string;
  mitigation: string;
  category: "Target" | "Instrument" | "Process" | "Infrastructure";
}
