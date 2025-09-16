import { fetchData } from "../apiMethods";

export async function getAllTractorSubsidyStates({ pageSlug }) {
  try {
    const result = await fetchData(`/api/subsidy_state_list`);
    return result.data;
  } catch (error) {
    console.error("Error fetching subsidy states:", error);
  }
}
