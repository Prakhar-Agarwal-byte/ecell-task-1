import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import db from "./firebase";
import { useSnackbar } from "notistack";

const App = () => {
  const { enqueueSnackbar } = useSnackbar();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    mobile: yup.string().matches(phoneRegExp).min(10).max(10).required(),
    subject: yup.string().required(),
    message: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const res = db.collection("contacts").add(data);
    if (res) {
      enqueueSnackbar("Message sent successfully", { variant: "success" });
      reset();
    } else {
      enqueueSnackbar("Message not sent", { variant: "error" });
    }
  };

  return (
    <Container>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} width="100%">
          <Card sx={{ padding: 5 }} raised>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                spacing={3}
                alignItems="center"
                justifyContent="center"
                direction="column"
              >
                <Grid item xs={12}>
                  <Typography variant="h4">Contact Us</Typography>
                </Grid>

                <Grid item width="100%">
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        variant="standard"
                        type="text"
                        label="Name"
                        {...register("name")}
                        fullWidth
                        error={errors.name}
                        helperText={errors.name && "Please enter your name"}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        variant="standard"
                        type="email"
                        fullWidth
                        label="Email"
                        {...register("email")}
                        error={errors.email}
                        helperText={
                          errors.email && "Please enter a valid email"
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        variant="standard"
                        type="tel"
                        label="Mobile Number"
                        fullWidth
                        {...register("mobile")}
                        error={errors.mobile}
                        helperText={
                          errors.mobile && "Please enter a valid mobile number"
                        }
                      />
                    </Grid>

                    <Grid item width="100%">
                      <TextField
                        variant="standard"
                        label="Subject"
                        fullWidth
                        {...register("subject")}
                        error={errors.subject}
                        helperText={errors.subject && "Please enter a subject"}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item width="100%">
                  <TextField
                    variant="standard"
                    multiline
                    rows={4}
                    type="text"
                    label="Message"
                    fullWidth
                    {...register("message")}
                    error={errors.message}
                    helperText={errors.message && "Please enter a message"}
                  />
                </Grid>

                <Grid item width="100%">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
