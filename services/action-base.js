"use server";

// headers
import { cookies } from "next/headers";
// lib
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const setAccessToken = async (accessToken) => {
  const date = new Date();
  cookies().set("accessToken", accessToken, {
    expires: date.setDate(date.getDate() + 28),
  });
};

export const setAdminToken = async (adminToken) => {
  let date = new Date();
  cookies().set("adminToken", adminToken, {
    expires: date.setDate(date.getDate() + 7),
  });
};

export const deleteAuthCookies = async () => {
  cookies().delete("accessToken");
  cookies().delete("adminToken");
  return { success: true, message: "Cookies Cleared" };
};

export const getAccessToken = async () => {
  return cookies().get("accessToken")?.value;
};

export const getAdminToken = async () => {
  return cookies().get("adminToken")?.value;
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
        if (info.response.includes("250")) {
          resolve(true);
        }
        reject(err);
      });
    });

    if (!successMail) {
      return { success: false, message: "Failed to send mail!" };
    }

    return { success: true, message: "Email Sent Successfully!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error" };
  }
};

export const checkAdmin = async () => {
  try {
    const token = await getAdminToken();
    if (!token) return { success: false, message: "Invader" };

    const data = jwt.verify(token, process.env.SECRET_KEY);
    if (!data.is_admin) return { success: false, message: "Invader" };

    return { success: true, message: "Hello Admin!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error!" };
  }
};

export const checkValidJWT = async (token) => {
  try {
    if (!token) return { success: false, message: "Token Absent!" };

    const data = jwt.verify(token, process.env.SECRET_KEY);

    return { success: true, message: "Valid", data };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Token Expired!" };
  }
};
