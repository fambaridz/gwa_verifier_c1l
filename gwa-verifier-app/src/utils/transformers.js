export function fromMapToArray(obj, keyName) {
  return Object.keys(obj).map((key) => ({ ...obj[key], [keyName]: key }));
}
