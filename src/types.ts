export type TBookNew = {
  title: string;
  author: string;
};

export type TBook = {
  _id: string
} & TBookNew

export type TBookUpdate = Partial<TBookNew>

