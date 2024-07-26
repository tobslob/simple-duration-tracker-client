import axios from "@/services";

export interface IUSerProps {
  name: string;
  emailAddress: string;
  gender: string;
  sleepTimeDuration: string;
  createdAt?: Date;
}

const getUsers = () => {
  return axios
    .get("users")
    .then((res) => res.data.data)
    .catch((e) => console.log(e));
};
const getUserByEmail = (email: string) => {
  return axios
    .get(`users?emailAddress=${email}`)
    .then((res) => res.data.data)
    .catch((e) => console.log(e));
};

const createUser = (data: IUSerProps) => {
  return axios
    .post(`users/`, {
      name: data.name,
      emailAddress: data.emailAddress,
      gender: data.gender,
      sleepTimeDuration: Number(data.sleepTimeDuration),
    })
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export { getUsers, createUser, getUserByEmail };
