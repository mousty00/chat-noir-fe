export const stripTypename = <T extends object>(obj: T): T => {
  if (!obj || typeof obj !== 'object') return obj;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { __typename: _typename, ...rest } = obj as any;
  
  Object.keys(rest).forEach(key => {
    if (rest[key] && typeof rest[key] === 'object') {
      rest[key] = stripTypename(rest[key]);
    }
  });
  
  return rest as T;
};