import { AppBar, IconButton, LinearProgress, Toolbar } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router';

type CustomAppbarProps = {
  title: string;
  elevation?: number;
  loading?: boolean;
};

export const CustomAppbar = ({ title, elevation = 1, loading = false }: CustomAppbarProps) => {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }
  return (
    <AppBar
      elevation={elevation}
      sx={{ backgroundColor: 'white', color: 'var(--blackColor)' }}
      className="font-medium"
    >
      <Toolbar>
        <IconButton size="large" edge="start" onClick={goBack}>
          <ArrowForwardIcon />
        </IconButton>
        <h1 className="mr-4">{title}</h1>
      </Toolbar>
      {loading && <LinearProgress color="primary" sx={{ height: 2 }} />}
    </AppBar>
  );
};
