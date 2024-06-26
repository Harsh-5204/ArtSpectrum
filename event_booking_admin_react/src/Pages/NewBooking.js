import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { CDBDataTable } from "cdbreact";

function NewBooking() {
  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/admin/getBooking");
      const datas = await response.json();
      setData(datas.booking);
    } catch (error) {
      setData([]);
      console.log("Fetch Booking Error:", error);
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
    formattedData = data
      ?.map((data) => ({
        // index:i+1,
        eventName: data.eventName,
        status:data.status,
        userId: data.userId,
        totalPrice: data.totalPrice,
        seats: data.seats,
        date: new Date(data.date).toLocaleDateString(),
        time: new Date(data.date).toLocaleTimeString(),
      }))
      .reverse();
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
                      <h4 className="card-title">Booking History</h4>
                      <div className="table-responsive">
                        {!isLoaded ? (
                          <div>Loading...</div>
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
                                // { label:"index", field:"index"},
                                { label: "Event Name", field: "eventName" },
                                { label: "User ID", field: "userId" },
                                { label: "Amount Paid", field: "totalPrice" },
                                { label: "seats", field: "seats" },
                                { label:"Status" ,field:"status"},
                                { label: "Date", field: "date" },
                                { label: "Time", field: "time" },
                                
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

export default NewBooking;
