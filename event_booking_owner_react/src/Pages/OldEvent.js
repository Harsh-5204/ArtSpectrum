import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { CDBDataTable } from "cdbreact";
import axios from "axios";

function OldEvent() {
  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/artist/getPastEvents");
      console.log(response.data);
      setData(response.data.pastEvents.reverse());
    } catch (error) {
      console.log(error);
      setData([]);
    } finally {
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
    fetchData();
  }, []);

  console.log(data);
  var formattedData = [];
  if (data.length > 0) {
    formattedData = data?.map((data, index) => ({
      // eventId: data._id,
      srNo: index + 1,
      eventName: data.eventName,
      category: data.category,
      pricePerSeat: data.pricePerSeat,
      totalSeats: data.totalSeats,
      date: new Date(data.datetime).toLocaleDateString(),
      time: new Date(data.datetime).toLocaleTimeString(),
      totalBookedSeats: data.totalBookedSeats,
    }
    ));
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
                      <h4 className="card-title"> Done Event Table</h4>
                      <div className="table-responsive">
                        {
                          !isLoaded ? (
                            <div>Loading...</div>
                          ) : data.length === 0 ? <div>No data found</div> : (
                            <CDBDataTable
                              striped
                              hover
                              responsive
                              entriesOptions={[5, 20, 25]}
                              entries={5}
                              pagesAmount={4}
                              data={{
                                columns: [
                                  { label: "Sr. No", field: "srNo" },
                                  { label: "Event Name", field: "eventName" },
                                  { label: "Category", field: "category" },
                                  { label: "Price", field: "pricePerSeat" },
                                  { label: "Total Seats", field: "totalSeats" },
                                  { label: "Date", field: "date" },
                                  { label: "Time", field: "time" },
                                  { label: "Total booked Seats", field: "totalBookedSeats" },
                                ],

                                rows: formattedData,
                              }}
                            />
                          )
                        }
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

export default OldEvent;
