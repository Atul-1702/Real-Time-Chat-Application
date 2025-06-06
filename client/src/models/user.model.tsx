
export default interface User {
    _id: string;
    firstname: string;
    lastname?: string,
    email: string,
    createdAt?: string,
    updatedAt?: string;
    profilepic?: string;
}