import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/** Read-only client used by the website. */
export const client = createClient({
  projectId: projectId || "missing-project-id",
  dataset,
  apiVersion,
  useCdn: true,
});
