/**
 * Enforce a value to be an array
 * @param v
 * @returns Array of
 */
export const forceArray = (v: any): any[] => (Array.isArray(v) ? v : [v])
