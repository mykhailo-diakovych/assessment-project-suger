export interface DataTable {
  creationTime: string;
  id: string;
  info: NonNullable<unknown> | any;
  lastUpdateTime: string;
  metaInfo: undefined | NonNullable<unknown>;
  organizationID: string;
  partner: string;
  probality?: string | number;
  stageName?: string;
  creationTimeFormatted?: string;
}

export type ChipsFormat = {
  title: string | string[] | number[];
  label: string;
};
