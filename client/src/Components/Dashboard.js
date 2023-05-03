import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../config";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    email: "",
    files: [],
  });
  const [filters, setFilters] = useState({
    name: "",
    format: "",
    size: [
      { label: "< 100kb", active: false },
      { label: "100kb - 1000kb", active: false },
      { label: "> 1000kb", active: false },
    ],
    day: "",
    month: "",
    year: "",
  });
  useEffect(() => {
    if (sessionStorage?.getItem("profiledata") === null) {
      navigate("/");
      return;
    }
    const sessionData = JSON.parse(sessionStorage?.getItem("profiledata"));
    setProfileData((prev) => {
      return {
        ...prev,
        email: sessionData?.email,
        files: sessionData?.files,
      };
    });
  }, []);
  const upload = async (e) => {
    const fileArr = Array.from(e.target.files);
    if (fileArr?.length === 0) {
      return;
    }
    const formData = new FormData();
    fileArr.map((i) => {
      formData.append("files", i);
    });
    const data = await axios.post(`${url}upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        user: profileData?.email,
      },
    });
    if (!data?.data?.returnCode) {
      toast.error(`${data?.data?.msg}`);
      return;
    }
    setProfileData((prev) => {
      return { ...prev, files: data?.data?.returnData?.files };
    });
    toast.success(`${data?.data?.msg}`);
    sessionStorage.setItem(
      "profiledata",
      JSON.stringify(data?.data?.returnData)
    );
  };
  const opentab = (link) => {
    window.open(`${url}${link}`, "_blank", "noreferrer");
  };
  const searchbyname = (e) => {
    const text = e.target.value;
    const sessionData = JSON.parse(sessionStorage?.getItem("profiledata"));
    setFilters((prev) => {
      return { ...prev, name: text };
    });
    if (text === "") {
      setProfileData((prev) => {
        return { ...prev, files: sessionData?.files };
      });
      return;
    }
    let filteredFiles = [];
    sessionData?.files?.map((i) => {
      const search = i?.name.toLowerCase().search(text.trim().toLowerCase());
      if (search !== -1) {
        filteredFiles.push(i);
      }
    });
    setProfileData((prev) => {
      return { ...prev, files: filteredFiles };
    });
  };
  const searchbytype = (e) => {
    const text = e.target.value;
    const sessionData = JSON.parse(sessionStorage?.getItem("profiledata"));
    setFilters((prev) => {
      return { ...prev, format: text };
    });
    if (text === "") {
      setProfileData((prev) => {
        return { ...prev, files: sessionData?.files };
      });
      return;
    }
    let filteredFiles = [];
    sessionData?.files?.map((i) => {
      const search = i?.format.search(text.trim().toLowerCase());
      if (search !== -1) {
        filteredFiles.push(i);
      }
    });
    setProfileData((prev) => {
      return { ...prev, files: filteredFiles };
    });
  };
  const searchbysize = (idx) => {
    const sessionData = JSON.parse(sessionStorage?.getItem("profiledata"));
    const sizeFilter = filters?.size?.map((i, ind) => {
      if (idx === ind) {
        return { ...i, active: true };
      }
      return { ...i, active: false };
    });
    setFilters((prev) => {
      return { ...prev, size: sizeFilter };
    });
    switch (idx) {
      case 0:
        let filterArr1 = sessionData?.files?.filter((i) => {
          return parseInt(i?.size?.split(" ")[0]) < 100;
        });
        setProfileData((prev) => {
          return { ...prev, files: filterArr1 };
        });
        break;
      case 1:
        let filterArr2 = sessionData?.files?.filter((i) => {
          return (
            parseInt(i?.size?.split(" ")[0]) >= 100 &&
            parseInt(i?.size?.split(" ")[0]) <= 1000
          );
        });
        setProfileData((prev) => {
          return { ...prev, files: filterArr2 };
        });
        break;
      case 2:
        let filterArr3 = sessionData?.files?.filter((i) => {
          return parseInt(i?.size?.split(" ")[0]) > 1000;
        });
        setProfileData((prev) => {
          return { ...prev, files: filterArr3 };
        });
        break;
      default:
        break;
    }
  };
  const searchbyday = (e) => {
    const text = e.target.value;
    const sessionData = JSON.parse(sessionStorage?.getItem("profiledata"));
    if (text?.length > 2) {
      return;
    }
    setFilters((prev) => {
      return { ...prev, day: text };
    });
    if (text === "") {
      setProfileData((prev) => {
        return { ...prev, files: sessionData?.files };
      });
      return;
    }
    let filteredFiles = [];
    sessionData?.files?.map((i) => {
      const search = i?.date.split(" ")[2].search(text.trim().toLowerCase());
      if (search !== -1) {
        filteredFiles.push(i);
      }
    });
    setProfileData((prev) => {
      return { ...prev, files: filteredFiles };
    });
  };
  const searchbymonth = (e) => {
    const text = e.target.value;
    const sessionData = JSON.parse(sessionStorage?.getItem("profiledata"));
    if (text?.length > 3) {
      return;
    }
    setFilters((prev) => {
      return { ...prev, month: text };
    });
    if (text === "") {
      setProfileData((prev) => {
        return { ...prev, files: sessionData?.files };
      });
      return;
    }
    let filteredFiles = [];
    sessionData?.files?.map((i) => {
      const search = i?.date
        .split(" ")[1]
        .toLowerCase()
        .search(text.trim().toLowerCase());
      if (search !== -1) {
        filteredFiles.push(i);
      }
    });
    setProfileData((prev) => {
      return { ...prev, files: filteredFiles };
    });
  };
  const searchbyyear = (e) => {
    const text = e.target.value;
    const sessionData = JSON.parse(sessionStorage?.getItem("profiledata"));
    if (text?.length > 4) {
      return;
    }
    setFilters((prev) => {
      return { ...prev, year: text };
    });
    if (text === "") {
      setProfileData((prev) => {
        return { ...prev, files: sessionData?.files };
      });
      return;
    }
    let filteredFiles = [];
    sessionData?.files?.map((i) => {
      const search = i?.date.split(" ")[3].search(text.trim().toLowerCase());
      if (search !== -1) {
        filteredFiles.push(i);
      }
    });
    setProfileData((prev) => {
      return { ...prev, files: filteredFiles };
    });
  };
  const clearFilter = () => {
    const sessionData = JSON.parse(sessionStorage?.getItem("profiledata"));
    setProfileData((prev) => {
      return { ...prev, files: sessionData?.files };
    });
    setFilters({
      name: "",
      format: "",
      size: [
        { label: "< 100kb", active: false },
        { label: "100kb - 1000kb", active: false },
        { label: "> 1000kb", active: false },
      ],
      day: "",
      month: "",
      year: "",
    });
  };
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const deleteFile = async (id) => {
    const data = await axios.post(
      `${url}delete`,
      JSON.stringify({ fileId: id }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!data?.data?.returnCode) {
      toast.error(`${data?.data?.msg}`);
      return;
    }
    setProfileData((prev) => {
      return { ...prev, files: data?.data?.returnData?.files };
    });
    toast.success(`${data?.data?.msg}`);
    sessionStorage.setItem(
      "profiledata",
      JSON.stringify(data?.data?.returnData)
    );
  };

  const FileItems = (props) => {
    const { i } = props;
    const [edit, setEdit] = useState(false);
    const [rename, setRename] = useState(i?.name.split(".")[0]);
    const editName = () => {
      setEdit(true);
    };
    const saveName = async () => {
      if (rename === "") {
        toast.error("Please enter a name!");
        return;
      }
      if (rename.includes(".")) {
        toast.error('Can not put "." in between!');
        return;
      }
      const data = await axios.post(
        `${url}update`,
        JSON.stringify({
          fileId: i?._id,
          fileName: rename + `.${i?.name.split(".")[1]}`,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!data?.data?.returnCode) {
        toast.error(`${data?.data?.msg}`);
        return;
      }
      setProfileData((prev) => {
        return { ...prev, files: data?.data?.returnData?.files };
      });
      toast.success(`${data?.data?.msg}`);
      sessionStorage.setItem(
        "profiledata",
        JSON.stringify(data?.data?.returnData)
      );
      setEdit(false);
    };
    return (
      <div
        onClick={(e) => {
          if (e.target.nodeName === "BUTTON" || edit) {
            return;
          }
          opentab(i?.name);
        }}
        className="file-item"
      >
        {edit ? (
          <input
            value={rename}
            onChange={(e) => {
              setRename(e.target.value);
            }}
            className="rename-input"
          />
        ) : (
          <div className="name">{i?.name}</div>
        )}
        <div className="date">{i?.date}</div>
        <div className="size">{i?.size}</div>
        <div className="action-button">
          <button
            type="button"
            className={`rename ${edit ? "save" : ""}`}
            onClick={() => {
              if (edit) {
                saveName();
                return;
              }
              editName();
            }}
          >
            {edit ? "Save" : "Rename"}
          </button>
          <button
            type="button"
            className="delete"
            onClick={() => {
              deleteFile(i?._id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-page">
      <div className="header">
        <div className="name">{profileData?.email}</div>
        <div className="actions">
          <div
            className="upload"
            onClick={() => {
              document.getElementById("upload").click();
            }}
          >
            Upload
          </div>
          <input
            style={{ display: "none", appearance: "none" }}
            id="upload"
            type={"file"}
            multiple={true}
            onChange={upload}
          />
          <div className="logout" onClick={logout}>
            Logout
          </div>
        </div>
      </div>
      <div className="body">
        <div className="filter">
          <input
            type="text"
            className="name-search"
            placeholder="Search by name"
            value={filters?.name}
            onChange={searchbyname}
          />
          <div className="section">
            <div className="label">Filter by type</div>
            <input
              type="text"
              value={filters?.format}
              onChange={searchbytype}
            />
          </div>
          <div className="section">
            <div className="label">Filter by size</div>
            {filters?.size?.map((i, idx) => (
              <div
                className={`size ${i?.active ? "active" : ""}`}
                key={`filter-size-${i?.label}`}
                onClick={() => {
                  searchbysize(idx);
                }}
              >
                {i?.label}
              </div>
            ))}
          </div>
          <div className="section">
            <div className="label">Filter by date</div>
            <span>Date</span>
            <input type="text" value={filters?.day} onChange={searchbyday} />
            <span>Month</span>
            <input
              type="text"
              value={filters?.month}
              onChange={searchbymonth}
            />
            <span>Year</span>
            <input type="text" value={filters?.year} onChange={searchbyyear} />
          </div>
          <button type="button" className="clear" onClick={clearFilter}>
            Clear
          </button>
        </div>
        <div className="files">
          {profileData?.files?.length === 0 ? (
            <div className="no-files">No files found!</div>
          ) : (
            <div className="all-files">
              {profileData?.files?.map((i) => (
                <Fragment key={`file-item-${i?._id}`}>
                  <FileItems i={i} />
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
