import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import TableFooter from "@mui/material/TableFooter";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../../features/items/itemSlice";
import Header from "../header/Header";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Products = () => {
  const [page, setPage] = useState(0);
  const { loading, success, items } = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    instock: "",
    description: "",
    category: "",
    quantity:""
  });
  let navigate = useNavigate();
  // add products

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name: formData.name,
        price: formData.price,
        instock: formData.instock,
        category: formData.category,
        description: formData.description,
        quantity:formData.quantity
      })
    );
    console.log(formData);

    // navigate("/dashboard");
  };
  // sudo fuser -k 8000/tcp

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <Header>
      <div
        style={{ height: 400, width: "100%", marginLeft: 30 }}
        className="container mt-5"
      >
        <div className="row">
          <div className="col-md-6">
            <h3>Products</h3>
          </div>
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-primary my-3"
              data-bs-toggle="modal"
              data-bs-target="#productModal"
            >
              <AddCircleOutlinedIcon /> Add
            </button>
          </div>
        </div>
        {/* product table  */}
        <div className="col-md-10">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700 }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="center">In Stock</StyledTableCell>
                  <StyledTableCell align="center">Date Created</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map((item) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {item.price}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {item.category}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {item.instock}
                    </StyledTableCell>
                    <StyledTableCell component="td" scope="row">
                      {item.created_at.substring(0, 10)}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      <span>
                        {" "}
                        <Button>
                          <VisibilityOutlinedIcon />
                        </Button>
                      </span>
                      <span>
                        {" "}
                        <Button
                          onClick={() => dispatch(deleteProduct(item.id))}
                        >
                          <DeleteOutlinedIcon />
                        </Button>
                      </span>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    sx={{ margin: "10px" }}
                    colSpan={3}
                    count={items.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
        {/* end of product table */}
        <div className="modal mt-5 fade" id="productModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title my-3">Add Product</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <form action="" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      min={1}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      min={1}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="instock">Instock</label>
                    <input
                      type="number"
                      name="instock"
                      value={formData.instock}
                      onChange={(e) => handleChange(e)}
                      min={1}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="form-control btn btn-primary">Create</button>
                </form>
                
                        {/* <Grid item xs={12} sm={6}>
                        <label htmlFor="category">Category</label>
                        <select
                          className="form-select"
                          value={formData.category}
                          onChange={(e) => handleChange(e)}
                          name="category"
                        >
                          {categories &&
                            categories.map((category) => {
                              return (
                                <option value={category.id} key={category.id}>
                                  {category.name}
                                </option>
                              );
                            })}
                        </select>
                      </Grid> */}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Products;
