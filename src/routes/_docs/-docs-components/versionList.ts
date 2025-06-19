export const versionList = ["3.5.0"] as const;
export type Version = typeof versionList[number];
export const versionPath = ["3_5_0"] as const;
export type VersionPath = typeof versionPath[number];