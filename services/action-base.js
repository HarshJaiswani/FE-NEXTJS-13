"use server";

// headers
import { cookies } from "next/headers";
// lib
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
// middleware
import connectDb from "@/middleware/connectDB.middleware";
// models
import User from "@/models/User.model";

export const ActionResponse = ({ message = "All went good!", data = {} }) => {
  return {
    message,
    success: true,
    ...data,
  };
};

export const ActionError = ({
  message = "Something went wrong!",
  data = {},
}) => {
  return {
    message,
    success: false,
    ...data,
  };
};

export const setAccessToken = async (accessToken) => {
  const date = new Date();
  cookies().set("accessToken", accessToken, {
    expires: date.setDate(date.getDate() + 28),
    httpOnly: true,
    secure: true,
    sameSite: true,
  });
};

export const setAdminToken = async (adminToken) => {
  let date = new Date();
  cookies().set("adminToken", adminToken, {
    expires: date.setDate(date.getDate() + 7),
    httpOnly: true,
    secure: true,
    sameSite: true,
  });
};

export const deleteAuthCookies = async () => {
  cookies().delete("accessToken");
  cookies().delete("adminToken");
  return ActionResponse({ message: "Cookies Cleared" });
};

export const revokeAccessToken = async () => {
  cookies().delete("accessToken");
  return ActionResponse({ message: "Access Token Revoked" });
};

export const revokeAdminToken = async () => {
  cookies().delete("adminToken");
  return ActionResponse({ message: "Admin Token Revoked" });
};

export const getAccessToken = async () => {
  const cookieValue = cookies().get("accessToken")?.value;
  return cookieValue;
};

export const getAdminToken = async () => {
  const cookieValue = cookies().get("adminToken")?.value;
  return cookieValue;
};

export const sendMail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      html,
    };

    const successMail = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (info?.response.includes("250")) {
          resolve(true);
        }
        reject(err);
      });
    });

    if (!successMail) return ActionError({ message: "Failed to send mail!" });

    return ActionResponse({ message: "Email Sent Successfully!" });
  } catch (error) {
    console.log(error);
    return ActionError({ message: "Something went wrong in sending mail!" });
  }
};

export const verifyIsUserAdmin = async () => {
  const token = await getAdminToken();
  try {
    if (!token) return ActionError({ message: "Invader" });

    const data = jwt.verify(token, process.env.SECRET_KEY);
    if (!data.is_admin) return ActionError({ message: "Invader" });

    return ActionResponse({
      message: "Hello Admin!",
      data: { data },
    });
  } catch (error) {
    console.log(error);
    return ActionError({
      message: "Something went wrong in validating admin!",
    });
  }
};

export const verifyIsUserAuthorized = async () => {
  const token = await getAccessToken();
  try {
    if (!token) return ActionError({ message: "Invader" });

    const data = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(data._id);
    if (!user || user.is_blocked)
      return ActionError({ message: "No user found!" });

    return ActionResponse({
      message: "Go ahead captain!",
      data: { user },
    });
  } catch (error) {
    console.log(error);
    return ActionError({ message: "Something went wrong in validating user!" });
  }
};

export const checkIsTokenValid = async (token) => {
  try {
    if (!token) return ActionError({ message: "Token Absent!" });

    const data = jwt.verify(token, process.env.SECRET_KEY);

    return ActionResponse({ message: "Valid", data: { data } });
  } catch (error) {
    console.log(error);
    return ActionError({ message: "Something went wrong in verifying token!" });
  }
};

export const asyncHandler = (
  resolver,
  { validateAdmin = false, validateUser = false, connectDB = true },
) => {
  return async (_) => {
    let userData = {};
    let adminData = {};
    if (connectDB) {
      await connectDb();
    }
    if (validateAdmin) {
      const response = await verifyIsUserAdmin();
      if (!response.success) return response;
      adminData = response.data;
    }
    if (validateUser) {
      const response = await verifyIsUserAuthorized();
      if (!response.success) return response;
      userData = response.user;
    }
    try {
      return await resolver(_, userData, adminData);
    } catch (error) {
      console.log(error);
      return ActionError({
        message: "Internal Server Error!",
      });
    }
  };
};

export const validateFields = (fields = []) => {
  if (fields.length === 0)
    return ActionError({ message: "No Data to validate" });
  const isError = fields.some((field) => {
    if (field === null || field === undefined) return true;
    return false;
  });

  return isError
    ? ActionError({ message: "Invalid fields!" })
    : ActionResponse({});
};
