import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';
import {client} from '$services/redis';
import {usersKey} from '$services/keys';
import { usernameUniqueKey } from '$services/keys';

export const getUserByUsername = async (username: string) => {

};

export const getUserById = async (id: string) => {
    const user = await client.hGetAll(usersKey(id));
    return deserialize(id, user);
};

export const createUser = async (attrs: CreateUserAttrs) => {
    const id = genId();
    // See if user is already in the database
    // if so throw an error
    const exists =  await client.sIsMember(usernameUniqueKey(), attrs.username);
    if (exists) {
        throw new Error('Username already exists');
    }
    await client.hSet(usersKey(id), serialize(attrs));
    await client.sAdd(usernameUniqueKey(), attrs.username);
    return id;
};

const serialize = (user: CreateUserAttrs) => {
    return {
        username: user.username,
        password: user.password,
    };
}

const deserialize = (id : string, user: {[key: string]: string}) => {
    return {
        id,
        username: user.username,
        password: user.password,
    }
}