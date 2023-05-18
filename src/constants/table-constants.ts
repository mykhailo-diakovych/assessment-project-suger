import { VDataTable } from "vuetify/lib/labs/components";

type Headers = InstanceType<typeof VDataTable>["headers"];
type ArrayArrayItems<T> = T extends Array<Array<infer I>> ? I : never;
export type ChipsFormat = {
  title: string | string[] | number[];
  label: string;
};

export type DataTableHeader = ArrayArrayItems<Headers>;

export const HEADERS_TABLE = [
  {
    title: "ID",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Name", align: "end", key: "name", sortable: false },
  { title: "Source", align: "end", key: "partner" },
  { title: "Creation time", align: "end", key: "creationTimeFormatted" },
  { title: "Stage Name", align: "end", key: "stageName" },
  { title: "Probability", align: "end", key: "probality" },
  {
    title: "Last Updated",
    align: "end",
    key: "lastUpdated",
    sortable: false,
  },
] as DataTableHeader[];

export const DATE_FORMAT = "YYYY-MM-DD";

export const NAMES_FILTERS = Object.freeze({
  STAGES: "Stages",
  SLIDER: "Slider",
  PARTNER: "Partner",
  DATE: "Date",
});

export const PARTNERS_ITEMS = Object.freeze({
  SALESFORCE: "SALESFORCE",
  HUBSPOT: "HUBSPOT",
});

export const SOURCE_ITEMS = [
  { title: PARTNERS_ITEMS.SALESFORCE, label: NAMES_FILTERS.PARTNER },
  { title: PARTNERS_ITEMS.HUBSPOT, label: NAMES_FILTERS.PARTNER },
] as ChipsFormat[];
