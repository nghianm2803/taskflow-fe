import useAuth from "../../hooks/useAuth";
import { Link, Grid, Typography, Stack, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { styled } from "@mui/material/styles";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

function Profile() {
  const { user } = useAuth();
  const { name, email, role } = user;

  return (
    <Grid container spacing={3}>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{name}</Typography>
        <Stack direction="row">
          <IconStyle>
            <EmailIcon />
          </IconStyle>
          <Typography variant="body2">{email}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle>
            <BusinessCenterIcon />
          </IconStyle>
          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.primary">
              {role}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Grid>
  );
}

export default Profile;
