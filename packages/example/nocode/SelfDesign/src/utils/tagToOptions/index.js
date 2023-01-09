import tags from './tags';

/** @type {Map<string, import('.').Result>} */
const m = new Map(Object.entries(tags));

/** @type {import('.').tagToOptions} */
export function tagToOptions(tag) {
  return m.get(tag) ?? null;
}