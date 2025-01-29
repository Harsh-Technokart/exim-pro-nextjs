"use client";
import React from "react";
import Table from "@mui/joy/Table";
import { Box, FormControl, FormLabel, Input, Button, Tooltip } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddUser from "@/components/usercomponents/AddUser";
import TablePagination from "@/components/utilities/Pagination"; // Import your pagination component

function createData(
  Id: number,
  Name: string,
  Email: string,
  Phone: number,
  Role: string,
  Approved_Status: string,
  Registration_Status: string,
  Registration_Link: string,
  Created_By: string,
  Approved_By: string
) {
  return {
    Id,
    Name,
    Email,
    Phone,
    Role,
    Approved_Status,
    Registration_Status,
    Registration_Link,
    Created_By,
    Approved_By,
  };
}

const rows = Array.from({ length: 10 }, (_, i) =>
  createData(
    i + 1,
    `User`,
    `user@gmail.com`,
    12345678901,
    i % 2 === 0 ? "Admin" : "User",
    i % 3 === 0 ? "Pending" : "Approved",
    "Register",
    "link",
    "Admin",
    "SuperAdmin"
  )
);

export default function Page() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [pageAndLimit, setPageAndLimit] = React.useState({ limit: 5, page: 1 });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const totalDocs = rows.length;
  const totalPages = Math.ceil(totalDocs / pageAndLimit.limit);
  const hasPrevPage = pageAndLimit.page > 1;
  const hasNextPage = pageAndLimit.page < totalPages;

  const Rows = rows.slice(
    (pageAndLimit.page - 1) * pageAndLimit.limit,
    pageAndLimit.page * pageAndLimit.limit
  );

  return (
    <>
      <Box
        sx={{
          width: "96%",
          margin: "2rem",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for Company User</FormLabel>
          <Input
            placeholder="Search"
            name="search_query"
            type="text"
            endDecorator={<SearchIcon />}
          />
        </FormControl>
        <Box sx={{ height: "10%", margin: "20px" }}>
          <Button
            startDecorator={<AddIcon />}
            onClick={handleOpenModal}
            variant="outlined"
            sx={{
              background: "#29328A",
              color: "white",
              "&:hover": { color: "white", bgcolor: "#29328A" },
            }}
          >
            Add New User
          </Button>
        </Box>
      </Box>

      <Box sx={{ margin: "20px" }}>
        <Table hoverRow>
          <thead style={{ fontSize: "small" }}>
            <tr>
              {[
                "#",
                "Name",
                "Email",
                "Phone",
                "Role",
                "Approved Status",
                "Registration Status",
                "Registration Link",
                "Created By",
                "Approved By",
              ].map((header, index) => (
                <th
                  key={header}
                  style={{
                    padding: ".4rem",
                    textAlign: "center",
                    background: "#5554B2",
                    color: "#ffffff",
                    fontSize: ".7rem",
                    verticalAlign: "middle",
                    borderRadius:
                      index === 0
                        ? "15px 1px 1px 1px"
                        : index === 9
                        ? "1px 15px 1px 1px"
                        : "1px 1px 1px 1px",
                  }}
                >
                  {header}
                  {header === "Registration Link" && (
                    <Tooltip
                      arrow
                      placement="right"
                      title="Resend activation link to user"
                    >
                      <InfoOutlinedIcon
                        style={{ marginLeft: "2px", fontSize: "1rem" }}
                        fontSize="small"
                      />
                    </Tooltip>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Rows.map((row) => (
              <tr key={row.Id}>
                <td>{row.Id}</td>
                <td>{row.Name}</td>
                <td>{row.Email}</td>
                <td>{row.Phone}</td>
                <td>{row.Role}</td>
                <td>{row.Approved_Status}</td>
                <td>{row.Registration_Status}</td>
                <td>{row.Registration_Link}</td>
                <td>{row.Created_By}</td>
                <td>{row.Approved_By}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <TablePagination
          pageAndLimit={pageAndLimit}
          setPageAndLimit={setPageAndLimit}
          pageData={{ totalPages, totalDocs, hasPrevPage, hasNextPage }}
        />
      </Box>

      {isModalOpen && <AddUser onClose={handleCloseModal} open={isModalOpen} />}
    </>
  );
}
