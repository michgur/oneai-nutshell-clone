export type PipelineOpts = {
  summaryLength: number;
  setArticleText: any;
  setExtractHTML: any;
};

export type Label = {
  type: string;
  skill: string;
  name: string;
  span_text: string;
  span: [number, number];
};
