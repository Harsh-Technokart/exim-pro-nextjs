import React, { Dispatch, SetStateAction } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/joy/IconButton";
import Option from "@mui/joy/Option";
import Select, { selectClasses } from "@mui/joy/Select";

function TablePagination(props: {
  pageAndLimit: { limit: number; page: number };
  setPageAndLimit: Dispatch<SetStateAction<{ limit: number; page: number }>>;
  pageData: {
    totalPages: number;
    totalDocs: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
}) {
  const handleChange = (
    _event: React.SyntheticEvent | null,
    newValue: number | null
  ) => {
    if (newValue) {
      props.setPageAndLimit((prevstate) => ({ ...prevstate, limit: newValue }));
    }
  };
  return (
    <div className="page_and_limit_wrapper">
      <Select
        size="sm"
        value={props.pageAndLimit.limit}
        name={"page_and_limit"}
        onChange={handleChange}
        indicator={<KeyboardArrowDown />}
        sx={{
          minHeight: "unset",
          minWidth: "5%",
          marginLeft: "1rem",
          [`& .${selectClasses.indicator}`]: {
            transition: "0.2s",
            [`&.${selectClasses.expanded}`]: {
              transform: "rotate(-180deg)",
            },
          },
        }}
      >
        {[10, 20, 50, 100].map((e) => (
          <Option key={e} value={e}>
            {e.toString()}
          </Option>
        ))}
      </Select>
      <p className="page_and_limit_counts">
        {(props.pageAndLimit.page - 1) * props.pageAndLimit.limit + 1}-
        {props.pageAndLimit.page * props.pageAndLimit.limit} of{" "}
        {props.pageData.totalDocs}
      </p>
      <div className="page_buttons">
        <IconButton
          size="sm"
          disabled={!props.pageData.hasPrevPage}
          sx={{ paddingLeft: "0.75rem" }}
          onClick={() => {
            props.setPageAndLimit((prevstate) => ({
              ...prevstate,
              page: prevstate.page - 1,
            }));
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          size="sm"
          disabled={!props.pageData.hasNextPage}
          sx={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
          onClick={() => {
            props.setPageAndLimit((prevstate) => ({
              ...prevstate,
              page: prevstate.page + 1,
            }));
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default TablePagination;
