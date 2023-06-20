import React from 'react';
import '../CSS/loading.css';
import CircularProgress from '@mui/material/CircularProgress';

class Loading extends React.Component {
  render() {
    return (
      <article className="main-loading">
        <CircularProgress />
        <p>Loading...</p>
      </article>
    );
  }
}

export default Loading;
