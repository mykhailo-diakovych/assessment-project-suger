import { ChipsFormat } from "@/types/data-table";
import { DataTableHeader } from "vuetify";

export const HEADERS_TABLE = [
  {
    text: "ID",
    align: "start",
    sortable: false,
    value: "id",
  },
  { text: "Name", align: "end", value: "name", sortable: false },
  { text: "Source", align: "end", value: "partner" },
  { text: "Creation time", align: "end", value: "creationTimeFormatted" },
  { text: "Stage Name", align: "end", value: "stageName" },
  { text: "Probability", align: "end", value: "probality" },
  {
    text: "Last Updated",
    align: "end",
    value: "lastUpdated",
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
