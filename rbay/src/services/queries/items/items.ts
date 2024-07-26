import type { CreateItemAttrs } from '$services/types';
import { client } from '$services/redis';
import { serialize } from './serialize';
import { genId } from '$services/utils';
import { itemKey } from '$services/keys';
import { deserialize } from './deserialize';

export const getItem = async (id: string) => {
    const item = await client.hGetAll(itemKey(id));

    if (Object.keys(item).length === 0) {
        return null;
    }
    return deserialize(id, item);

};

export const getItems = async (ids: string[]) => {
    const commands = ids.map(id => {
        return client.hGetAll(itemKey(id));
    });
    const result = await Promise.all(commands);
    return result.map((item, i) => {
        if (Object.keys(item).length === 0) {
            return null;
        }
        return deserialize(ids[i], item);
    });
    
};

export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
    const id = genId();
    const serialized = serialize(attrs);
    await client.hSet(itemKey(id), serialized);
    return id;
};
