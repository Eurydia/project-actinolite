export type DiagramClass = {
  className: string;
  attributes: DiagramClassAttribute[];
};

export type DiagramClassAttribute = {
  name: string;
  type: string;
  accessLevel: string;
};
