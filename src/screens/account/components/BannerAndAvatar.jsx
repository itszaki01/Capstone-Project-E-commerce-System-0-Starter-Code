import {
  Avatar,
  Box,
} from "@mui/material";
import React from "react";
import UserAccountBanner from "./../../../assets/user-account-banner.jpg";
import { CameraAlt } from "@mui/icons-material";
import defaultAvatar from "./../../../assets/defaultAvatar.png";
import { useLocation } from "react-router-dom";
import { ACCOUNT_EDIT } from "../../../constants/routes";
import PropType from "prop-types";


const BannerAndAvatar = ({
  isLoading,
  avatar,
  register,
  imageFile,
  onFileChange,
}) => {
  const { pathname } = useLocation();

  // console.log("imageFile", imageFile, avatar);

  return (
    <Box position="relative" bgcolor="primary" mt={3} mb={15}>
      <Box width="100%" height="15rem">
        <img
          src={UserAccountBanner}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </Box>
      <Box bgcolor="pink" width={100} position="relative">
        <Avatar
          sx={{
            width: 150,
            height: 150,
            position: "absolute",
            bottom: "-5rem",
            left: "3rem",
            border: " 2px solid lightGray ",
            outline: "8px solid white",
          }}
          src={isLoading ? defaultAvatar : imageFile?.avatar?.url || avatar}
        />
        {pathname === ACCOUNT_EDIT && (
          <label htmlFor="edit-avatar">
            <input
              {...register("avatar")}
              hidden
              accept="image/*"
              disabled={isLoading}
              type="file"
              onChange={(e) =>
                onFileChange(e, { name: "avatar", type: "single" })
              }
              id="edit-avatar"
            />

            <CameraAlt
              sx={{
                p: 1,
                borderRadius: "50%",
                color: "white",
                position: "absolute",
                bottom: "-7rem",
                right: "-3.5rem",
                border: "5px solid white",
                bgcolor: "black",
                cursor: "pointer",
              }}
            />
          </label>
        )}
      </Box>
    </Box>
  );
};

export default BannerAndAvatar;
BannerAndAvatar.propTypes = {
  isLoading: PropType.bool,
  avatar: PropType.string,
  register: PropType.func,
  imageFile:PropType.object,
  onFileChange: PropType.func
};
