import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { CDBDataTable } from "cdbreact";
import axios from "axios";

function Feedback() {
  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/artist/getFeedback"
      );

      setData(response.data.feedback.reverse());
    } catch (error) {
      console.log(error);
      setData([]);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
    fetchData();
  }, []);


  var formattedData = [];
  if (data.length > 0) {
    formattedData = data?.map((data) => ({
      feedbackId: data._id,
      subject: data.subject,
      comment: data.message,
    }));
  }

  return (
    <>
      <div className="container-scroller">
        <Sidebar />
        <div className="container-fluid page-body-wrapper">
          <Header />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Feedback Table</h4>
                      <div className="table-responsive">
                        {!isLoaded ? (
                          <div>Loading...</div>
                        ) : data.length === 0 ? (
                          <div>No data found</div>
                        ) : (
                          <CDBDataTable
                            striped
                            hover
                            responsive
                            entriesOptions={[5, 20, 25]}
                            entries={5}
                            pagesAmount={4}
                            data={{
                              columns: [
                                { label: "Feedback ID", field: "feedbackId" },
                                { label: "Subject", field: "subject" },
                                { label: "Message", field: "comment" },
                              ],
                              rows: formattedData,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
