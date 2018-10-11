const styles = theme => ({
  lineExplanation: {
    display: 'grid',
    gridTemplateColumns: props =>
      props.label
        ? '1fr 2fr'
        : '1fr',
    background: theme.main.colors.line,
    padding: theme.main.padding.medium,
    marginBottom: theme.main.margin.medium,
    borderRadius: theme.main.borderRadius.small,
  },
});

export default styles;
