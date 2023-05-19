export function decode(value: any): any {
  if (value instanceof Array) {
    return value.map((val) => decode(val));
  } else if (value instanceof Object) {
    const newValue: { [key: string]: any } = {};
    for (const [key, val] of Object.entries(value)) {
      newValue[decode(key)] = decode(val);
    }
    return newValue;
  } else {
    return decodeURIComponent(value);
  }
}
