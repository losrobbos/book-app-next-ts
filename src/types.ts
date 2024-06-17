export type TUserNew = {
  username: string,
  email: string;
  pw: string
}

export type TUser = TUserNew & {
  _id: string
}

export type TUserPublic = Omit<TUser, "pw">;

export type TBookNew = {
  title: string;
  author: string;
};

export type TBook = {
  _id: string
} & TBookNew

export type TBookUpdate = Partial<TBookNew>

