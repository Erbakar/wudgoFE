export const GenderTypes = {
  Unknown: 0,
  Male: 1,
  Female: 2,
} as const;

export const allGenders = [
  GenderTypes.Unknown,
  GenderTypes.Male,
  GenderTypes.Female
];

export function allGendersTypeText(gender: GenderType) {
  if (gender === GenderTypes.Unknown) {
    return 'Bilinmiyor';
  }
  if (gender === GenderTypes.Male) {
    return 'Erkek';
  }
  if (gender=== GenderTypes.Female) {
    return 'Kadın'
  }
  else {
    return ''
  }
}

export type GenderType = typeof GenderTypes[keyof typeof GenderTypes];