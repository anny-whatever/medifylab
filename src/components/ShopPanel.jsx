import React, { useState, useEffect, useRef } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
import {
  Pagination,
  Chip,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useContext } from "react";
import { DataContext } from "../utils/dataContext.js";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ShopCard from "./ShopCard";

function ShopPanel() {
  const { products } = useContext(DataContext);
  const [category, setCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [view, setView] = useState("grid"); // grid or list view
  const shopRef = useRef(null);

  // Filter products based on category and search query
  useEffect(() => {
    let productsArray = [];

    // First filter by category
    products?.productsArray?.forEach((product) => {
      if (product.category === category || category === "all") {
        productsArray.push(product);
      }
    });

    // Then filter by search query
    if (searchQuery) {
      productsArray = productsArray.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.generic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOption === "price-low") {
      productsArray.sort((a, b) => a.discount - b.discount);
    } else if (sortOption === "price-high") {
      productsArray.sort((a, b) => b.discount - a.discount);
    } else if (sortOption === "discount") {
      productsArray.sort(
        (a, b) =>
          (b.price - b.discount) / b.price - (a.price - a.discount) / a.price
      );
    }

    setFilteredProducts(productsArray);
    setCurrentPage(1); // Reset to first page when filters change
  }, [category, products, searchQuery, sortOption]);

  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts?.length / productsPerPage);

  // Get products for current page
  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const current = filteredProducts?.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    setCurrentProducts(current);
  }, [currentPage, filteredProducts]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of shop section when changing page
    if (shopRef.current) {
      shopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSortChange = (key) => {
    setSortOption(key);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    setCategory("all");
    setSearchQuery("");
    setSortOption("default");
  };

  const getCategoryTitle = () => {
    switch (category) {
      case "all":
        return "All Products";
      case "ed":
        return "Erectile Dysfunction";
      case "control":
        return "Painkillers & More";
      case "performance":
        return "Performance / Power";
      case "other":
        return "Others";
      default:
        return "All Products";
    }
  };

  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleView = () => {
    setView(view === "grid" ? "list" : "grid");
  };

  return (
    <motion.div
      className="max-w-[85rem] mx-auto px-4 py-8 md:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      ref={shopRef}
    >
      {/* Page Header */}
      <div className="mb-10 text-center">
        <motion.h1
          className="text-3xl font-bold text-gray-800 sm:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Shop for Medicines
        </motion.h1>
        <motion.p
          className="mt-3 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Browse our selection of high-quality products at the best prices
        </motion.p>
      </div>

      {/* Search and Sort Bar */}
      <div className="flex flex-col items-center gap-4 mb-8 md:flex-row">
        <div className="w-full md:w-1/2">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="max-w-full"
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
            size="lg"
          />
        </div>

        <div className="flex justify-between w-full gap-2 md:w-1/2 md:justify-end">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                color="secondary"
                className="min-w-[120px]"
              >
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                    />
                  </svg>
                  Sort
                </span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Sort options"
              selectedKeys={[sortOption]}
              onAction={handleSortChange}
            >
              <DropdownItem key="default">Default</DropdownItem>
              <DropdownItem key="price-low">Price: Low to High</DropdownItem>
              <DropdownItem key="price-high">Price: High to Low</DropdownItem>
              <DropdownItem key="discount">Highest Discount</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Button
            variant="flat"
            onClick={toggleFilterMenu}
            className="md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </Button>

          <Button variant="flat" onClick={toggleView}>
            {view === "grid" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            )}
          </Button>
        </div>
      </div>

      {/* Applied Filters */}
      {(category !== "all" || searchQuery || sortOption !== "default") && (
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center mr-2 text-sm font-medium text-gray-700">
            Applied Filters:
          </div>
          {category !== "all" && (
            <Chip
              onClose={() => setCategory("all")}
              variant="flat"
              color="primary"
              className="capitalize"
            >
              Category: {getCategoryTitle()}
            </Chip>
          )}
          {searchQuery && (
            <Chip
              onClose={() => setSearchQuery("")}
              variant="flat"
              color="primary"
            >
              Search: {searchQuery}
            </Chip>
          )}
          {sortOption !== "default" && (
            <Chip
              onClose={() => setSortOption("default")}
              variant="flat"
              color="primary"
            >
              Sort:{" "}
              {sortOption === "price-low"
                ? "Price: Low to High"
                : sortOption === "price-high"
                ? "Price: High to Low"
                : "Highest Discount"}
            </Chip>
          )}
          <Button
            size="sm"
            variant="light"
            color="danger"
            onClick={clearFilters}
          >
            Clear All
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Filter Sidebar - Desktop */}
        <motion.div
          className="hidden w-64 md:block shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="sticky p-6 bg-white border border-gray-100 shadow-sm top-24 rounded-xl">
            <h2 className="pb-4 mb-4 text-xl font-bold border-b text-primary">
              Categories
            </h2>
            <RadioGroup
              value={category}
              onValueChange={setCategory}
              color="secondary"
              className="gap-3"
            >
              <Radio value="all" description="All available products">
                All Products
              </Radio>
              <Radio value="ed" description="Treatments for ED">
                Erectile Dysfunction
              </Radio>
              <Radio value="control" description="Pain management products">
                Painkillers & More
              </Radio>
              <Radio
                value="performance"
                description="Energy & vitality products"
              >
                Performance / Power
              </Radio>
              <Radio value="other" description="Additional products">
                Others
              </Radio>
            </RadioGroup>

            <div className="pt-4 mt-8 border-t">
              <h3 className="mb-3 font-medium">
                Found {filteredProducts?.length || 0} products
              </h3>
              <p className="text-sm text-gray-500">
                {filteredProducts?.length > 0
                  ? "Browse our curated selection of premium products designed for your needs."
                  : "No products found matching your filters. Try adjusting your search."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mobile Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute top-0 right-0 w-4/5 h-full max-w-md p-6 overflow-y-auto bg-white"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-primary">Filters</h2>
                  <button onClick={toggleFilterMenu} className="text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mb-8">
                  <h3 className="mb-4 font-medium">Categories</h3>
                  <RadioGroup
                    value={category}
                    onValueChange={(value) => {
                      setCategory(value);
                      // setIsFilterOpen(false);
                    }}
                    color="secondary"
                    className="gap-2"
                  >
                    <Radio value="all">All Products</Radio>
                    <Radio value="ed">Erectile Dysfunction</Radio>
                    <Radio value="control">Painkillers & More</Radio>
                    <Radio value="performance">Performance / Power</Radio>
                    <Radio value="other">Others</Radio>
                  </RadioGroup>
                </div>

                <div className="pt-6 mt-auto">
                  <Button
                    color="secondary"
                    className="w-full"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Apply Filters
                  </Button>
                  <Button
                    variant="flat"
                    className="w-full mt-3"
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid/List */}
        <div className="flex-1">
          {filteredProducts?.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 text-center h-96 bg-gray-50 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mb-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                No products found
              </h3>
              <p className="mb-6 text-gray-600">
                Try adjusting your search or filter criteria
              </p>
              <Button color="primary" onClick={clearFilters}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <div
                className={`grid ${
                  view === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                } gap-6`}
              >
                <AnimatePresence mode="popLayout">
                  {currentProducts?.map((product) => (
                    <motion.div
                      key={product.uuid}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                      }}
                    >
                      <Link to={`/product/${product.uuid}`}>
                        <ShopCard
                          title={product.name}
                          price={product.price}
                          discountedPrice={product.discount}
                          description={product.description}
                          mainImage={product.mainImage}
                          viewMode={view}
                          category={product.category}
                          brand={product.brand}
                          generic={product.generic}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <Pagination
                    total={totalPages}
                    color="secondary"
                    showControls
                    initialPage={1}
                    page={currentPage}
                    onChange={handlePageChange}
                    classNames={{
                      wrapper: "gap-1",
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ShopPanel;
