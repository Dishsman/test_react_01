import "./App.css";
import { Select, Space, Table, Input } from "antd";
import { useEffect, useState } from "react";
interface IData {
  make_id: string;
  make_display: string;
  make_is_common: string;
  make_country: string;
}

const App = () => {
  const [selected, setSelected] = useState<string>(); //ถ้าต้องการให้ว่าง ใส่ arrayว่าง []
  const [cars, setCars] = useState<IData[]>([]); // ใช้สำหรับเก็บข้อมูลที่ได้จาก API []หลัง คือ default valueซึ่งเป็นarrayเปล่า ส่วน[]หน้าหมายถึง IData เป็นarrayไม่ได้เป็นobject ตัวเดียว
  const [filteredCars, setFilteredCars] = useState<IData[]>([]); // New state to store filtered cars
  const [currentPage, setCurrentPage] = useState(1);
  // console.log(cars[0].make_country) //หลัง ? เป็น true หลัง  : เป็น false ต้องทำเพราะ fletch ไม่ทันมันจะพัง
  console.log(cars.length > 0 ? cars[0].make_country : "ggez"); //หลัง ? เป็น true หลัง  : เป็น false ต้องทำเพราะ fletch ไม่ทันมันจะพัง (ก่อน?คือเงื่อนไข หลัง?คือeffect หลัง:คือeffectถ้าไม่สำเร็จเงื่อนไข)
  //ex console.log cars[0].make_country อันนี้ ถ้าfail console.log "ggez" อันนี้
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    // setSelected("1")
    // ฟังก์ชันที่จะดึงข้อมูลจาก API
    const fetchCars = async () => {
      //async function ทำให้รอ ทำเรียงตามลำดับ await
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/ak1103dev/e4a31efd9f5dcac80e086f0ab9a88ffb/raw/e77545dbef9b06bd138b085b5421eaca77cfe18f/cars.json"
        ); // API URL
        const data = await response.json(); // แปลงข้อมูลที่ได้รับเป็น JSON
        setCars(data?.Makes); // เก็บข้อมูลที่ได้ลงใน state
      } catch (error) {
        console.error("Error fetching data:", error); // จัดการกรณีเกิดข้อผิดพลาด
      }
    };
    // useEffect(() => {
    //   if (cars[0].make_country === "Italy") {
    //     console.log("Search Term is italy, filtering users by country...");
    //   }
    // }, []);

    fetchCars(); // เรียกใช้ฟังก์ชันเมื่อ component ถูก mount
  }, []);
  useEffect(() => {
    console.log("it's working");
  }, []);

  const columns = [
    {
      title: "name", //ชื่อ  title
      dataIndex: "make_id", //พวก john doe, jane smith (ข้อมูลข้างใน)
      key: "name",
      // width: 300, ไม่work
    },
    // {
    //   title: 'Age',
    //   dataIndex: 'age',
    //   key: 'age',
    // },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
    {
      title: "country",
      dataIndex: "make_country",
      key: "country",
    },
  ];
  const carList = cars.map((car) => (
    <div key={car.make_id}>
      <h3>{car.make_display}</h3>
      <p>Country: {car.make_country}</p>
    </div>
  ));
  // const data = [
  //   {
  //     key: '1',
  //     name: cars[0]?.make_id,
  //     age: 32,
  //     address: '10 Downing Street',
  //     country: cars[0]?.make_country
  //   },
  //   {
  //     key: '2',
  //     name: 'Jane Smith',
  //     age: 28,
  //     address: '11 Downing Street',
  //     country: "usa"
  //   },
  //   {
  //     key: '3',
  //     name: 'zoro',
  //     age: 28,
  //     address: 'east blue',
  //     country: "china"
  //   },
  // ];
  const handleChange = (value: string) => {
    setSelected(value);
  };
  const handlePageChange = (page: number) => {
    /*pagination ใช้*/
    setCurrentPage(page); // Update current page
  };
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const handleButtonClick = () => {
    setButtonClicked(true);
  };
  const handleButtonClick2 = () => {
    setButtonClicked((prevState) => !prevState);
  };
  //ไม่ใช้   const usaCars = cars.filter(car => car.make_country === 'USA');
  // const [usfilter,setUsfilter] = usaCars.map((car) => ( {car: car.make_id}
  // <div key={car.make_id}>
  //   <h3>{car.make_display} {car.make_country}</h3>
  //   {/* <p>Country: {car.make_country}</p> */}
  // </div>
  // ));

  // useEffect(() => {
  //   if (selected === 'usa' ) {
  //     console.log({usfilter});
  //   }
  // }, [selected]);

  //ยังใช้อยู่ useEffect(() => {
  //   if (selected === 'usa') {
  //     // Filter the cars by selected country
  //     const usCars = cars.filter(car => car.make_country === 'USA');
  //     // const limitedUsCars = usCars.slice(0, 3);
  //     setFilteredCars(usCars); // Set the filtered cars
  //   } else {
  //     setFilteredCars([]); // Clear the filtered cars if another country is selected
  //   }
  // }, [selected, cars]);

  // ver ล่าสุด
  // useEffect(() => {
  //   if (selected) {
  //     // Filter the cars by selected country
  //     const filteredCars = cars.filter(car => car.make_country.toLowerCase() === selected.toLowerCase());
  //     // Set the filtered cars to the state
  //     setFilteredCars(filteredCars);
  //   } else {
  //     // If no country is selected, show all cars
  //     setFilteredCars(cars);
  //   }
  // }, [selected, cars]);
  useEffect(() => {
    let filtered = cars;

    // Filter by country if a country is selected
    if (selected) {
      //if selected is not empty, null, undefined, or other falsy values, then the code inside the if block will run.
      filtered = filtered.filter(
        (
          car //.filter() creates a new array, but only includes the items that pass the condition
        ) => car.make_country.toLowerCase() === selected.toLowerCase() //condition ที่ว่า  หยิบมาเฉพาะที่.makecountry ตรงกับselected
      );
    }

    // Filter by search term (make_display)
    if (searchTerm) {
      filtered = filtered.filter((car) =>
        car.make_display.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCars(filtered); // Set the filtered cars to state
  }, [selected, cars, searchTerm]);

  // Map over the filtered cars to log their details   (use)
  // const usfilter = usCars.map((car) => ({
  //   make_display: car.make_display,
  //   make_country: car.make_country,
  // }));

  // Log the filtered and mapped cars                         (use)
  //     const limitedUsFilter = usfilter.slice(0, 5);
  //     console.log({ limitedUsFilter });
  //   }
  // }, [selected, cars]); // Track both `selected` and `cars` for changes
  return (
    <>
      <div
        className="bg" /*style={{background:"red",width:"100vw",height:"100vh"}}*/
      >
        <div className="table">
          <Table
            columns={columns}
            dataSource={filteredCars}
            rowKey="make_id"
            className="table-is-real"
            pagination={{
              current: currentPage, // Track the current page
              pageSize: 3, // Limit to 5 rows per page
              total: filteredCars.length, // Total number of filtered cars
              onChange: handlePageChange, // Handle page change
            }}
          />
          <Space wrap className="select">
            <Select
              value={selected}
              // defaultValue="John Doe" ตัด ออกให้เห็น search
              style={{ width: 130 }}
              onChange={handleChange}
              allowClear
              options={[
                // { value: 'france', label: 'france' },
                // { value: 'china', label: 'china' },
                // { value: 'usa', label: 'usa' },
                { value: "australia", label: "Australia" },
                { value: "austria", label: "Austria" },
                { value: "china", label: "China" },
                { value: "czech republic", label: "Czech Republic" },
                { value: "denmark", label: "Denmark" },
                { value: "france", label: "France" },
                { value: "germany", label: "Germany" },
                { value: "india", label: "India" },
                { value: "italy", label: "Italy" },
                { value: "japan", label: "Japan" },
                { value: "malaysia", label: "Malaysia" },
                { value: "russia", label: "Russia" },
                { value: "serbia", label: "Serbia" },
                { value: "south korea", label: "South Korea" },
                { value: "sweden", label: "Sweden" },
                { value: "switzerland", label: "Switzerland" },
                { value: "taiwan", label: "Taiwan" },
                { value: "uk", label: "UK" },
                { value: "ukraine", label: "Ukraine" },
                { value: "usa", label: "USA" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
              placeholder="select-country"
            />

            {/* <Select
        defaultValue="John Doe"
        style={{ width: 120 }}
        disabled
        options={[{ value: 'John Doe', label: 'John Doe' }
        ]}
      />  */}
          </Space>
        </div>
        <div className="headline">
          <h2> Cars</h2>
        </div>
        <div className="search_name" /*style={{ width: 130 }}*/>
          <Input
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            style={{ width: 200 }}
          />
        </div>
      </div>
      <p>{buttonClicked ? "Button was clicked!" : "Please click the button"}</p>
      <button onClick={handleButtonClick}>Click กู</button>
      <button onClick={handleButtonClick2}>Click กู</button>
      <h1>
        xd gg u noob 4
      </h1>
      <div>{carList}</div>;
      {/* <div> {filter}</div> */}
    </>
  );
};

export default App;
