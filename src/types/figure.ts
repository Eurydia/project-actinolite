export type UMLClass = {
  className: string;
  attributes: UMLClassAttribute[];
};

export type UMLClassAttribute = {
  name: string;
  type: string;
};
