/**
 * Adds common test tags, good for testing and development process, transparent
 * to production;
 * @param strings first template string value
 * @param values otehr template array string values
 * @returns template string array or undefined;
 */
export default function testTag(
  strings: TemplateStringsArray,
  ...values: string[]
): string | undefined {
  if (process.env.NODE_ENV === "production") return undefined;
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings.raw[i];
    if (i < values.length) {
      result += values[i];
    }
  }
  return result;
}
