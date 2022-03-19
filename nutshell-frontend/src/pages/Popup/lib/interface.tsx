export type PipelineOpts = {
  summaryLength: number;
};

export type Label = {
  type: string;
  name: string;
  span_text: string;
  span: [number, number];
};
