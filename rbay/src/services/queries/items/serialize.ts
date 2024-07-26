import type { CreateItemAttrs } from '$services/types';

export const serialize = (attrs: CreateItemAttrs) => {
    return {
        ...attrs,
        createdAt: attrs.createdAt.toMillis(), // easy for sorting 
        endingAt: attrs.endingAt.toMillis(),
    };
};
