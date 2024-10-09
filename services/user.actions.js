"use server";

import { ActionResponse, asyncHandler } from "./action-base";

export const exampleAction = asyncHandler(
  async (data) => {
    console.log(data); // this is the data passed in exampleAction
    return ActionResponse({
      status: 200,
      message: "Success response example",
      data: { keyName: "data to be sent!" },
    });
  },
  { validateAdmin: true, validateUser: false, connectDB: false },
);
