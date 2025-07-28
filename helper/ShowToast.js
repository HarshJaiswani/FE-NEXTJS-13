import toast from "react-hot-toast";

export const ShowToast = (success, message) => {
  if (success) {
    toast.success(message);
  } else {
    toast.error(message);
  }
};
