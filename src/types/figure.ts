type ValueOf<T extends object> = T[keyof T];

export type DiagramClass = {
  name: string;
  attributes: DiagramClassAttribute[];
  methods: DiagramClassMethod[];
};

export const AccessLevel = {
  PRIVATE: "-",
  PROTECTED: "#",
  PUBLIC: "+",
} as const;

export type DiagramClassAttribute = {
  id: string;
  access_: ValueOf<typeof AccessLevel>;
  primary: string;
  secondary: string;
};

export type DiagramClassMethod = {
  access_: ValueOf<typeof AccessLevel>;
  primary: string;
  secondary: string;
};
