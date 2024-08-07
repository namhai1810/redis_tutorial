export const pageCacheKey = (id: string) => `pagecache#${id}`;
export const usersKey = (userid: string) => `users#${userid}`;
export const sessionKey = (sessionId: string) => `session#${sessionId}`;
export const itemKey = (itemId: string) => `item:${itemId}`;
export const usernameUniqueKey = () => `username:unique`;
export const userLikesKey = (userId: string) => `users:likes#${userId}`;
