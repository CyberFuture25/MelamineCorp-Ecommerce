import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
//  Change this path to point to your root-level inngest folder
import {
  syncUserCreation,
  syncUserUpdate,
  syncUserDeletion,
} from "../../../inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserUpdate, syncUserDeletion],
});
