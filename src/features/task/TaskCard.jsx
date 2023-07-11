import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
} from "@mui/material";
import "./taskstyle.css";
import { fDate } from "../../utils/formatTime";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { updateTask } from "./taskSlice";

const updateSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const methods = useForm({
    resolver: yupResolver(updateSchema),
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    dispatch(updateTask({ id: task._id, ...data }));
  };

  useEffect(() => {
    reset(task);
  }, [task, reset]);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleTaskClick = () => {
    setShowDetail(!showDetail);
  };

  const handleCloseForm = () => {
    setShowDetail(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <Card
          className={isHovered ? "task-card-hovered" : "task-card"}
          sx={{
            p: 1,
            width: "100%",
            height: "80px",
            position: "relative",
            overflow: "hidden",
            marginBottom: "10px",
          }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={handleTaskClick}
        >
          <Typography sx={style}>{task.name}</Typography>
          <Box
            sx={{
              display: "grid",
              rowGap: 3,
              columnGap: 2,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              },
            }}
          >
            <Typography sx={style}>
              {task.assignTo ? task.assignTo : "Unassigned"}
            </Typography>
            <Typography sx={style}> {fDate(task.deadline)}</Typography>
          </Box>
        </Card>
        {showDetail && (
          <Box
            sx={{
              position: "fixed",
              top: "170px",
              right: 0,
              width: "50%",
              height: "calc(100vh - 65px)",
              overflow: "hidden",
              backgroundColor: "#9BE8D8",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
              onClick={handleCloseForm}
            >
              <CloseIcon />
            </IconButton>
            <CardContent>
              <Typography>{task.name}</Typography>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                padding: "10px",
              }}
            >
              <Box sx={{ marginRight: "10px" }}>
                <Card>
                  <CardContent>
                    <Typography variant="body2">
                      Status {task.status}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ marginRight: "10px" }}>
                <Card>
                  <CardContent>
                    <Typography variant="body2">
                      Assignee {task.assignTo ? task.assignTo : "Unassigned"}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ marginRight: "10px" }}>
                <Card>
                  <CardContent>
                    <Typography variant="body2">
                      Deadline{fDate(task.deadline)}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
            <Box sx={{ padding: "10px", height: "150px" }}>
              <Card sx={{ padding: "10px", height: "100px" }}>
                <Typography sx={{ textAlign: "left" }}>Description</Typography>
                <CardContent>
                  <Typography>{task.description}</Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ padding: "10px" }}>
              <Card>
                <CardContent>Comment section here</CardContent>
              </Card>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

const style = {
  fontWeight: "500px",
  fontSize: "14px",
  lineHeight: "20px",
  letterSpace: "0px",
  wordBreak: "break-word",
  cursor: "pointer",
};

export default TaskCard;
