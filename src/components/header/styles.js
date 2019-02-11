const styles = theme => ({
  header: {
    padding: `${theme.main.padding.large} 0`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLinkWrapper: {
    margin: 0,
  },
  headerLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    fontSize: '1.6rem',
  },
});

export default styles;
