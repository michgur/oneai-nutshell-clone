export type PipelineOpts = {
  summaryPercent: number;
};

export type Label = {
  type: string;
  name: string;
  span_text: string;
  span: [number, number];
};
