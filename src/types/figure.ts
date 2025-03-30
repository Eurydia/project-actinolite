export type UMLClassData = {
  className: string;
  attributes: UMLClassAttribute[];
};

export type UMLClassAttribute = {
  name: string;
  type: string;
};
