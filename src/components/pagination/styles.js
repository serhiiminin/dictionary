const styles = theme => ({
  page: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, auto)',
    gap: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationInput: {
    width: '100px',
  },
  paginationPanel: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, auto))',
    justifyContent: 'end',
    gap: '1rem',
    background: theme.main.colors.background,
    padding: '10px 10px',
  }
});

export default styles;
