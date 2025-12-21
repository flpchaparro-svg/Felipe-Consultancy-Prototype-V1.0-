
export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  visualPrompt: string;
  bgImage: string;
  icon: string;
}

export type GridSpan = {
  col: string;
  row: string;
};
