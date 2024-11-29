import React, { useState, useEffect } from "react";
import "./CameraTable.css";
import warningIcon from "../../assets/warning.svg";
import deactivateIcon from "../../assets/deactivate.svg";
import activateIcon from "../../assets/activate.svg";
import locationIcon from "../../assets/Location.svg";
import statusIcon from "../../assets/status.svg";
import searchIcon from "../../assets/search.svg";
import deleteIcon from "../../assets/delete.svg";
import serviceIcon from "../../assets/service.svg";
import cloudIcon from "../../assets/cloud.svg";

const healthMap = {
  A: 100,
  B: 80,
  C: 60,
  D: 40,
  E: 20,
  F: 0,
};

const getHealthColor = (percentage) => {
  if (percentage > 80) return "green";
  if (percentage > 40) return "orange";
  return "red";
};

const CameraTable = () => {
  const [cameraData, setCameraData] = useState([]);
  const [locationFilter, setLocationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchCameraData = async () => {
      try {
        const response = await fetch(
          "https://api-app-staging.wobot.ai/app/v1/fetch/cameras",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer 4ApVMIn5sTxeW7GQ5VWeWiy`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (Array.isArray(result.data)) {
          setCameraData(result.data);
        } else {
          console.error("Unexpected API response format:", result);
          setCameraData([]);
        }
      } catch (err) {
        console.error("Error fetching camera data:", err);
        setError(err.message);
      }
    };

    fetchCameraData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationFilterChange = (e) => {
    setLocationFilter(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleActivateCamera = async (cameraId) => {
    try {
      const response = await fetch(
        "https://api-app-staging.wobot.ai/app/v1/update/camera/status",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer 4ApVMIn5sTxeW7GQ5VWeWiy`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: cameraId, status: "Active" }),
        }
      );

      if (response.ok) {
        console.log(`Camera with ID ${cameraId} activated successfully`);
        setCameraData((prevData) =>
          prevData.map((camera) =>
            camera.id === cameraId ? { ...camera, status: "Active" } : camera
          )
        );
      } else {
        console.error(`Failed to activate camera with ID ${cameraId}`);
      }
    } catch (error) {
      console.error(`Error activating camera with ID ${cameraId}:`, error);
    }
  };

  const handleDeactivateCamera = async (cameraId) => {
    try {
      const response = await fetch(
        "https://api-app-staging.wobot.ai/app/v1/update/camera/status",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer 4ApVMIn5sTxeW7GQ5VWeWiy`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: cameraId, status: "Inactive" }),
        }
      );

      if (response.ok) {
        console.log(`Camera with ID ${cameraId} deactivated successfully`);
        setCameraData((prevData) =>
          prevData.map((camera) =>
            camera.id === cameraId ? { ...camera, status: "Inactive" } : camera
          )
        );
      } else {
        console.error(`Failed to deactivate camera with ID ${cameraId}`);
      }
    } catch (error) {
      console.error(`Error deactivating camera with ID ${cameraId}:`, error);
    }
  };

  const handleDeleteCamera = (cameraId) => {
    setCameraData((prevData) =>
      prevData.filter((camera) => camera.id !== cameraId)
    );
    console.log(`Camera with ID ${cameraId} deleted from the frontend.`);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(Math.ceil(filteredData.length / rowsPerPage));
  };

  // Filter and search data
  const filteredData = cameraData
    .filter((camera) =>
      camera.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (camera) => locationFilter === "All" || camera.location === locationFilter
    )
    .filter(
      (camera) => statusFilter === "All" || camera.status === statusFilter
    );

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="camera-table-container">
      {/* Header Section */}
      <div className="header">
        <div>
          <h1>Cameras</h1>
          <p>Manage your cameras here.</p>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span className="material-symbols-outlined">
            <img src={searchIcon} alt="Search" />
          </span>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filters">
        <div className="filter">
          <div className="filter-wrapper">
            <img src={locationIcon} alt="Location" className="filter-icon" />
            <select
              id="location-filter"
              value={locationFilter}
              onChange={handleLocationFilterChange}
            >
              <option value="All" disabled hidden>
                Location
              </option>
              <option value="All">All</option>
              {Array.from(new Set(cameraData.map((camera) => camera.location)))
                .filter(Boolean)
                .map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="filter">
          <div className="filter-wrapper">
            <img src={statusIcon} alt="Status" className="filter-icon" />
            <select
              id="status-filter"
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="All" disabled hidden>
                Status
              </option>
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {error ? (
        <div className="error-message">Error: {error}</div>
      ) : (
        <>
          <div className="camera-table-wrapper">
            <table className="camera-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Health</th>
                  <th>Location</th>
                  <th>Recorder</th>
                  <th>Tasks</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((camera) => (
                  <tr key={camera._id}>
                    <td style={{ position: "relative" }}>
                      {camera.name}
                      {camera.hasWarning && (
                        <img
                          src={warningIcon}
                          alt="Warning"
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: "35px",
                            width: "15px",
                            height: "15px",
                          }}
                        />
                      )}
                    </td>
                    <td>
                      <div className="health-loader">
                        {/* Cloud Health Loader */}
                        <span className="health-icon">
                          <img
                            src={cloudIcon}
                            alt="Cloud Health"
                            className="health-icon-image"
                            style={{ width: "20px", height: "20px" }}
                          />
                        </span>
                        <div className="health-circle">
                          <svg className="progress-circle" viewBox="0 0 36 36">
                            <circle
                              className="progress-background"
                              cx="18"
                              cy="18"
                              r="15"
                            />
                            <circle
                              className="progress-bar"
                              cx="18"
                              cy="18"
                              r="15"
                              style={{
                                strokeDasharray: `${
                                  healthMap[camera.health.cloud]
                                } 100`,
                                stroke: `${getHealthColor(
                                  healthMap[camera.health.cloud]
                                )}`,
                              }}
                            />
                            <text
                              x="50%"
                              y="50%"
                              textAnchor="middle"
                              dy=".3em"
                              className="progress-text"
                            >
                              {camera.health.cloud}
                            </text>
                          </svg>
                        </div>

                        {/* Device Health Loader */}
                        <span className="health-icon">
                          <img
                            src={serviceIcon}
                            alt="Device Health"
                            className="health-icon-image"
                            style={{ width: "15px", height: "15px" }}
                          />
                        </span>
                        <div className="health-circle">
                          <svg className="progress-circle" viewBox="0 0 36 36">
                            <circle
                              className="progress-background"
                              cx="18"
                              cy="18"
                              r="15"
                            />
                            <circle
                              className="progress-bar"
                              cx="18"
                              cy="18"
                              r="15"
                              style={{
                                strokeDasharray: `${
                                  healthMap[camera.health.device]
                                } 100`,
                                stroke: `${getHealthColor(
                                  healthMap[camera.health.device]
                                )}`,
                              }}
                            />
                            <text
                              x="50%"
                              y="50%"
                              textAnchor="middle"
                              dy=".3em"
                              className="progress-text"
                            >
                              {camera.health.device}
                            </text>
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td>{camera.location}</td>
                    <td>{camera.recorder || "N/A"}</td>
                    <td>{camera.tasks}</td>
                    <td>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          backgroundColor:
                            camera.status === "Active"
                              ? "#0292621A"
                              : "#f0f0f0",
                          color:
                            camera.status === "Active" ? "#029262" : "#999",
                          fontWeight: "bold",
                          fontSize: "14px",
                          textAlign: "center",
                        }}
                      >
                        {camera.status}
                      </span>
                    </td>
                    <td>
                      {camera.status === "Active" ? (
                        <button
                          style={{
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeactivateCamera(camera.id)}
                        >
                          <img
                            src={deactivateIcon}
                            alt="Deactivate"
                            style={{ width: "20px", height: "20px" }}
                          />
                        </button>
                      ) : (
                        <button
                          style={{
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => handleActivateCamera(camera.id)}
                        >
                          <img
                            src={activateIcon}
                            alt="Activate"
                            style={{ width: "20px", height: "20px" }}
                          />
                        </button>
                      )}
                      <button
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteCamera(camera.id)}
                      >
                        <img
                          src={deleteIcon}
                          alt="Delete"
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "red",
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-controls">
            <div className="rows-per-page">
              <label htmlFor="rows-per-page">Rows per page:</label>
              <select
                id="rows-per-page"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="page-info">
              {`${indexOfFirstItem + 1}-${Math.min(
                indexOfLastItem,
                filteredData.length
              )} of ${filteredData.length}`}
            </div>
            <div className="navigation-buttons">
              <button
                onClick={handleFirstPage}
                disabled={currentPage === 1}
                aria-label="First Page"
              >
                &laquo;
              </button>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                aria-label="Previous Page"
              >
                &lt;
              </button>
              <button
                onClick={handleNextPage}
                disabled={
                  currentPage === Math.ceil(filteredData.length / rowsPerPage)
                }
                aria-label="Next Page"
              >
                &gt;
              </button>
              <button
                onClick={handleLastPage}
                disabled={
                  currentPage === Math.ceil(filteredData.length / rowsPerPage)
                }
                aria-label="Last Page"
              >
                &raquo;
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraTable;
