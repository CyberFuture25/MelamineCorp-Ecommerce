import { inngest } from "./client";
import { prisma } from "../lib/prisma";

// 1. Inngest Function to save user data to the database
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-create",
    triggers: [{ event: "clerk/user.created" }], // Moved inside the 1st argument
  },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.create({
      data: {
        id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      },
    });
  },
);

// 2. Inngest Function to update user data in the database
export const syncUserUpdate = inngest.createFunction(
  {
    id: "sync-user-update",
    triggers: [{ event: "clerk/user.updated" }], // Moved inside the 1st argument
  },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.update({
      where: { id: data.id },
      data: {
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      },
    });
  },
);

// 3. Inngest Function to delete user data from the database
export const syncUserDeletion = inngest.createFunction(
  {
    id: "sync-user-delete",
    triggers: [{ event: "clerk/user.deleted" }], // Moved inside the 1st argument
  },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.delete({
      where: { id: data.id },
    });
  },
);
