import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import axios from "axios";
// เรียกใช้ hook useInView
import { useInView } from "react-cool-inview";

function App() {
  const { observe } = useInView({
    threshold: 0.25, // Default is 0
    onEnter: () => {
      // ทำงานเมื่อพบ element ที่ observe ไว้ แสดงขึ้นบน viewport
      console.log("found element change set page", page + 1);
      setPage((page) => page + 1);
    },
  });

  const [items, setItems] = useState([]);
  // เก็บสถานะขณะ fetch data เพื่อแสดงข้อความ loading
  const [isLoading, setIsLoading] = useState(false);
  // เก็บหน้าที่เรียกปัจจุบัน
  const [page, setPage] = useState(0);
  // ต้องการเรียกครั้งละกี่ item
  const size = 10;

  async function fetchPassenger(page, size) {
    setIsLoading(true);

    // เรียก get api ผ่าน axios และส่ง page, size ที่ต้องการ
    axios
      .get(
        `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`
      )
      .then(function (response) {
        setIsLoading(false);
        const newItems = response.data.data;
        console.log(newItems);
        //นำข้อมูลที่ได้ลงใน items ทั้งข้อมูลเก่า และข้อมูลใหม่ เพื่อแสดงผลทั้งหมด
        setItems((oldItems) => [...oldItems, ...newItems]);
      });
  }

  useEffect(() => {
    fetchPassenger(page, size);
  }, [page]);

  return (
    <div className="App">
      <p>Reactjs Infinite Scroll</p>
      {items.map((item, index) => (
        <Card
          ref={(el) => {
            if (index + 1 == (page + 1) * size) {
              observe(el); // กำหนด element เป้าหมายที่จะ observe เป็นตัวสุดท้ายของ items เท่านั้น
            }
          }}
          key={index}
          index={index}
          title={item.name}
        />
      ))}
      {isLoading ? <div>Loading...</div> : null}
    </div>
  );
}

export default App;
