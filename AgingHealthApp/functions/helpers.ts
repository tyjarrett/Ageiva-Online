import { VariableId, isVariableId } from "../types/Profile";

export function hasKey<K extends PropertyKey>(
  obj: object,
  key: K
): key is keyof typeof obj {
  return Object.keys(obj).includes(key as string);
}

export function filter_data_object(
  obj: Record<VariableId, number>,
  func: (k: VariableId, v: number) => boolean
): Record<VariableId, number> {
  const new_obj = {} as Record<VariableId, number>;
  for (const [key, entry] of Object.entries(obj)) {
    if (isVariableId(key) && func(key, entry)) {
      new_obj[key] = entry;
    }
  }
  return new_obj;
}
