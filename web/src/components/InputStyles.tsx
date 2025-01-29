export const inputStyles = {
  input: {
    borderRadius: "10px",
    backgroundColor: "transparent",
    color: "white",
    borderColor: "rgba(255, 255, 255, 0.2)",
    "&:focus": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
  },
  item: {
    backgroundColor: "transparent",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    "&[data-selected]": {
      "&, &:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        color: "white",
      },
    },
  },
  dropdown: {
    backgroundColor: "#19212b",
  },
};
