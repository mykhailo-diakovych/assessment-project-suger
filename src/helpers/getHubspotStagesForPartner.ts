import { DataTable } from "@/types/data-table";
import { ChipsFormat, NAMES_FILTERS } from "@/constants/table-constants";

export const getHubspotStagesForPartner = (
  item: DataTable,
  hubspotStages: ChipsFormat[]
) => {
  hubspotStages.push({
    title: item?.info.hubspotDeal?.dealstage.label,
    label: NAMES_FILTERS.STAGES,
  });
  hubspotStages = hubspotStages.filter((stage) => stage.title !== undefined);
  return hubspotStages;
};
