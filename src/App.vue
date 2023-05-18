<template>
  <v-app class="mx-10 justify-space-between">
    <div class="d-flex flex-row align-center mt-8">
      <div class="d-flex w-75 align-center">
        <TableFilterButton
          @filterSource="filterSource"
          :items="sourceItems"
          name="Partner"
        />
        <TableFilterButton
          class="ml-2"
          @filterSource="filterStage"
          :items="filteredStages"
          name="Stages"
        />
        <TableDatePicker v-model="selectedDate" class="ml-2" />
        <div class="w-50 ml-4">
          <TableRangeSlider v-model:range="range" />
        </div>
      </div>
    </div>
    <TableChips @removeFilter="removeFilter" :chips="chips" />
    <v-data-table
      v-if="loading"
      v-model:items-per-page="itemsPerPage"
      :headers="headerTable"
      :items="filteredData"
      item-value="name"
      class="elevation-1 mt-4 scrollable-table"
    />
  </v-app>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { DataTable } from "@/types/data-table";
import dayjs from "dayjs";
import TableRangeSlider from "@/components/TableRangeSlider.vue";
import {
  ChipsFormat,
  DATE_FORMAT,
  HEADERS_TABLE,
  NAMES_FILTERS,
  PARTNERS_ITEMS,
  SOURCE_ITEMS,
} from "@/constants/table-constants";
import TableFilterButton from "@/components/TableFilterButton.vue";
import { removeDuplicatesFromArrOfObj } from "@/helpers/removeDuplicatesFromArrOfObj";
import TableDatePicker from "@/components/TableDatePicker.vue";
import { getDataForColumns } from "@/helpers/getDataForColumns";
import { isTimeInRange } from "@/helpers/isTimeInRange";
import TableChips from "@/components/TableChips.vue";
import { getHubspotStagesForPartner } from "@/helpers/getHubspotStagesForPartner";
import axios from "axios";

export default defineComponent({
  components: {
    TableChips,
    TableDatePicker,
    TableFilterButton,
    TableRangeSlider,
  },
  data() {
    return {
      range: [0, 300] as number[],
      loading: false,
      selectedDate: [
        "2023-02-01",
        dayjs(new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000)).format(
          DATE_FORMAT
        ),
      ],
      chips: [] as ChipsFormat[],
      currentStage: [] as string[],
      currentPartner: [] as string[],
      stageName: [] as ChipsFormat[],
      hubspotStages: [] as ChipsFormat[],
      sourceItems: SOURCE_ITEMS,
      itemsPerPage: 10,
      headerTable: HEADERS_TABLE,
      dataTable: [] as DataTable[],
    };
  },
  computed: {
    filteredStages() {
      let result = [] as ChipsFormat[];
      if (
        this.currentPartner.length > 1 ||
        !this.currentPartner.length ||
        this.currentPartner[0] === PARTNERS_ITEMS.SALESFORCE
      ) {
        result = this.stageName;
      } else {
        result = this.hubspotStages;
      }
      return result;
    },
    filteredData(): DataTable[] {
      const [min, max] = this.range;
      return this.dataTable.filter((item) => {
        const isCurrentPartnerQuery =
          !this.currentPartner.length ||
          !!this.currentPartner.find((partner) => partner === item.partner);
        const isCurrentStageQuery =
          !this.currentStage.length ||
          !!this.currentStage.find((stage) => stage === item.stageName);

        const isProbalityQuery =
          Number(item?.probality) >= min && Number(item?.probality) <= max;

        const isTimeInRangeQuery =
          !this.selectedDate ||
          isTimeInRange(item.creationTimeFormatted, this.selectedDate);

        return (
          isCurrentPartnerQuery &&
          isProbalityQuery &&
          isTimeInRangeQuery &&
          isCurrentStageQuery
        );
      });
    },
  },
  methods: {
    removeFilter(item: ChipsFormat) {
      if (item.label === NAMES_FILTERS.PARTNER) {
        this.currentPartner = this.currentPartner.filter(
          (t: string) => t !== item.title
        );
        this.chips = this.chips.filter((chip) => chip.title !== item.title);
      }
      if (item.label === NAMES_FILTERS.STAGES) {
        this.currentStage = this.currentStage.filter(
          (t: string) => t !== item.title
        );
        this.chips = this.chips.filter((chip) => chip.title !== item.title);
      }
      if (item.label === NAMES_FILTERS.SLIDER) {
        this.range = [0, 300];
        this.removeChip(item.label);
      }

      if (item.label === NAMES_FILTERS.DATE) {
        this.selectedDate = [
          "2023-02-01",
          dayjs(
            new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000)
          ).format(DATE_FORMAT),
        ];
        this.removeChip(item.label);
      }
    },
    filterSource(e: { title: string; label: string }) {
      this.currentPartner = [...new Set([...this.currentPartner, e.title])];
      this.chips = [...new Set([...this.chips, e])];
    },
    filterStage(e: { title: string; label: string }) {
      this.currentStage = [...new Set([...this.currentStage, e.title])];
      this.chips = [...new Set([...this.chips, e])];
    },

    getColumnsDataForTable(item: DataTable) {
      this.stageName = [
        {
          title:
            item?.info.salesforceOpportunity?.Opportunity.StageName ||
            item?.info.hubspotDeal?.dealstage.label,
          label: NAMES_FILTERS.STAGES,
        },
        ...this.stageName,
      ];
      this.hubspotStages = getHubspotStagesForPartner(item, this.hubspotStages);
      return getDataForColumns(item);
    },

    getColumnsForTable(item: DataTable) {
      if (this.stageName.length) {
        this.stageName = removeDuplicatesFromArrOfObj(
          this.stageName,
          "label",
          "title"
        );
      }
      return this.getColumnsDataForTable(item);
    },

    addNewChip(newChip: ChipsFormat) {
      this.chips = [
        ...this.chips.filter((chip) => chip.label !== newChip.label),
        newChip,
      ];
    },
    removeChip(label: ChipsFormat["label"]) {
      this.$nextTick(() => {
        this.chips = this.chips.filter((chip) => chip.label !== label);
      });
    },
  },
  watch: {
    selectedDate(val) {
      this.addNewChip({
        label: NAMES_FILTERS.DATE,
        title: `${dayjs(val[0]).format(DATE_FORMAT)} to ${dayjs(val[1]).format(
          DATE_FORMAT
        )}`,
      });
    },
    range(val) {
      if (!val) {
        return;
      }
      this.addNewChip({
        label: NAMES_FILTERS.SLIDER,
        title: val.join(" to "),
      });
    },
  },
  mounted: async function () {
    try {
      this.loading = false;
      const { data } = await axios.get("data/data.json");
      this.dataTable = data?.map((item: DataTable) => {
        return {
          ...this.getColumnsForTable(item),
          lastUpdated: dayjs(item?.lastUpdateTime).format(DATE_FORMAT),
          creationTimeFormatted: dayjs(item?.creationTime).format(DATE_FORMAT),
          ...item,
        };
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = true;
    }
  },
});
</script>
<style>
.v-table__wrapper {
  height: calc(100vh - 240px) !important;
  overflow-y: auto;
}

.v-data-table-footer {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
</style>
