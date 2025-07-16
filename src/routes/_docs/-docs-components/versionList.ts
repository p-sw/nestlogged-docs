export const versionList = ["3.7"] as const;
export type Version = (typeof versionList)[number];
export const versionPath = ["3_7"] as const;
export type VersionPath = (typeof versionPath)[number];
