type Theme = {
  app: {
    background: string;
  };
  movieCard: {
    background: string;
  };
};

export const theme: Theme = {
  app: {
    background: "#eee",
  },
  movieCard: {
    background: "#fff",
  },
};

declare module "styled-components/native" {
  export interface DefaultTheme extends Theme {}
}
