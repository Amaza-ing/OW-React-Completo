interface LabeledOption<Value extends string> {
  value: Value;
  label: string;
}

export function getOptionLabel<Value extends string>(
  options: readonly LabeledOption<Value>[],
  value: Value,
): string {
  const option = options.find((currentOption) => currentOption.value === value);

  return option?.label ?? value;
}
