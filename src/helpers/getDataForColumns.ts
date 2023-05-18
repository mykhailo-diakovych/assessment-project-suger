import { DataTable } from "@/types/data-table";

export const getDataForColumns = (item: DataTable) => {
  return {
    name:
      item?.info.salesforceOpportunity?.Opportunity.Name ||
      item?.info.hubspotDeal?.dealname,
    stageName:
      item?.info.salesforceOpportunity?.Opportunity.StageName ||
      item?.info.hubspotDeal?.dealstage.label,
    probality:
      (item?.info.salesforceOpportunity?.Opportunity.Probability
        ? item?.info.salesforceOpportunity?.Opportunity.Probability
        : "0") || item?.info.hubspotDeal?.hs_deal_stage_probability,
  };
};
