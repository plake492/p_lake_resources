export const setStyles = ({
  label = 'input',
  color,
  width,
  style,
  radius,
}: any) => {
  return {
    [`--${label}-field-border-color`]: color,
    [`--${label}-field-border-width`]: width,
    [`--${label}-field-border-style`]: style,
    [`--${label}-field-border-radius`]: radius,
  }
}
