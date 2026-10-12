"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const SINGLETONS = ["siteSettings"];

export default defineConfig({
  name: "maveelight",
  title: "Maveelight Dashboard",
  basePath: "/studio",
  // A placeholder keeps the build from crashing before the real id is added.
  projectId: projectId || "missing-project-id",
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  document: {
    // Settings is a single document: it cannot be created again, duplicated or deleted.
    actions: (prev, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? prev.filter(
            ({ action }) =>
              action &&
              !["unpublish", "delete", "duplicate"].includes(action),
          )
        : prev,
  },
});
