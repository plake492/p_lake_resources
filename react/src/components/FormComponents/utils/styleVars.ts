export const setStyles = ({
  label = 'input',
  color,
  width,
  style,
  radius,
}: any): { [key: string]: string } => {
  return {
    [`--${label}-field-border-color`]: color,
    [`--${label}-field-border-width`]: width,
    [`--${label}-field-border-style`]: style,
    [`--${label}-field-border-radius`]: radius,
  }
}
