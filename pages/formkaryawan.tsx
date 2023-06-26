import { useState,useEffect } from "react";
import axios from "axios";
import { stat } from "fs";

 
 const koneksiKaryawan = axios.create({
  
  baseURL: "http://127.0.0.1:5000/api/karyawan" 
});

export default function FormKaryawan() {
    const [statenama, setNama] = useState("");
    const [statenik, setNik] = useState("");
    const [statetanggal_masuk, setTanggal_masuk] = useState("2018-07-22");
    const [statetanggal_keluar, setTanggal_keluar] = useState("2018-07-22");
    const [statealamat, setAlamat] = useState("");
    const [statefoto, setFoto] = useState("");
    const [karyawan, setKaryawan] =  useState(null);
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show");
     
    const [stateedit,setEdit]=useState("hide");

     
    
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
   
  const handleSubmitAdd =  (event) => {
    
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiKaryawan
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
     
 }
 const handleSubmitEdit =  (event) => {
    
  event.preventDefault();
  const address = "/"+event.target.nik.value;
  alert(address);
  //const formData = new FormData(event.target);
  const formData = {
    nik: event.target.nik.value,
    nama: event.target.nama.value,
    tanggal_masuk: event.target.tanggal_masuk.value,
    tanggal_keluar: event.target.tanggal_keluar.value,
    alamat: event.target.alamat.value
}
  alert(formData);
  koneksiKaryawan
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
   
}
  const handleAdd = (event) => {
    
     setAdd("show");
     setbtnAdd("hide");
     setEdit("hide");
 
      
  }
  const handleCancelAdd = (event) => {
    
     setAdd("hide");
     setbtnAdd("show");
     setEdit("hide");
 
      
  }
  const handleCancelEdit = (event) => {
    
    setAdd("hide");
    setbtnAdd("show");
    setEdit("hide");
    setNama("");
    setNik("");
    setAlamat("");
    setTanggal_masuk(formatDate("2018-07-22"));
    setTanggal_keluar(formatDate("2018-07-22"));
    setFoto("");
     
 }
   const handleDelete = (event) => {
            event.preventDefault();
            var nik = event.target.value;
            koneksiKaryawan.delete(`/${nik}`)
              .then(response => {
                console.log('Data berhasil dihapus:', response.data);
                setKaryawan(
                  karyawan.filter((karyawan) => {
                     return karyawan.nik !== nik;
                  }))
             
                // Lakukan langkah-langkah lain setelah penghapusan data
              })
              .catch(error => {
                console.error('Gagal menghapus data:', error);
              })
          }

      const handleEdit = (event) => {
            event.preventDefault();
            var nik = event.target.value;
            
               const kryEdit =  karyawan.filter((karyawan) => {
                     return karyawan.nik == nik;
                  });
                  if(kryEdit!=null){

                    setNama(kryEdit[0].nama);
                    setNik(kryEdit[0].nik);
                    setAlamat(kryEdit[0].alamat);
                    setTanggal_masuk(formatDate(kryEdit[0].tanggal_masuk));
                    setTanggal_keluar(formatDate(kryEdit[0].tanggal_keluar));
                    setFoto(kryEdit[0].foto);
                    setAdd("hide");
                    setbtnAdd("show");
                    setEdit("show");

                  }
          }
  useEffect(() => {
      async function getKaryawan() {
        const response = await koneksiKaryawan.get("/").then(function (axiosResponse) {
            setKaryawan(axiosResponse.data.data); 
     
         })
         .catch(function (error) {   
          alert('error from karyawan in api karyawan: '+error);
         });;
          }
      getKaryawan();
    }, []);
  
   
if(karyawan==null){
return(
  <div>
    waiting...
  </div>
)
}else{

  return (

    <center>
    <div>
      <div className="bg">
    <h2 style={{backgroundColor:"red",
    color:"white",
    fontFamily:"times",
    fontSize:"25px",
    padding:"5px"
  
  }}>
    Data Keluar Masuk Karyawan</h2><br />
     <button id="btnadd" onClick={handleAdd} className={statebutonadd} style={{
      backgroundColor:"yellow",
      color:"black",
      fontFamily:"times",
      padding:"5px",
      fontSize:"15px",


     }}>Tambah Data</button>
    
       <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd}>
        <table border={0}>
            <tbody>
            <tr>
            <td> <label> Nik:</label></td>
            <td><input type="text" id="nik" name="nik"/>
              
              </td>
        </tr>
        <tr>
            <td>  <label> Nama:</label></td>
            <td><input type="text" id="nama"   name="nama" 
               /></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>   <input
                    type="file" name="image"/>  </td>
        </tr>
        <tr>
            <td>  <label> Tanggal Masuk:</label></td>
            <td>  <input type="date" name="tanggal_masuk"
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label> Tanggal Keluar:</label></td>
            <td>  <input type="date" name="tanggal_keluar"
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label> Alamat:</label></td>
            <td><textarea  id="address" style={{resize: "none"}}  name="alamat" ></textarea></td>
        </tr>
            </tbody>
          </table>
          <input type="submit" />
          <input type="button" value="cancel" onClick={handleCancelAdd} />
          </form>  
      <form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}>
 
          <table border={0}>
            <tbody>
            <tr>
            <td> <label> Nik:</label></td>
            <td><input type="text" id="nik"  value={statenik} name="nik"/>
              {/* onChange={handleOnchangeNim}  /> */}
              </td>
        </tr>
        <tr>
            <td>  <label> Nama:</label></td>
            <td><input type="text" id="nama"  value={statenama} name="nama"
               onChange={(e) => setNama(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>  <img src={statefoto} width="80"/> </td>
        </tr>
        <tr>
            <td>  <label> Tanggal Masuk:</label></td>
            <td>  <input type="date" value={statetanggal_masuk} name="tanggal_masuk"  onChange={(e) => setTanggal_masuk(e.target.value)}
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label> Tanggal Keluar</label></td>
            <td>  <input type="date" value={statetanggal_keluar} name="tanggal_keluar"  onChange={(e) => setTanggal_keluar(e.target.value)}
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label> Alamat:</label></td>
            <td><textarea  id="address" style={{resize: "none"}} value={statealamat} name="alamat"  onChange={(e) => setAlamat(e.target.value)}></textarea></td>
        </tr>
            </tbody>
          </table>
          <input type="submit" />
          <input type="button" value="cancel" onClick={handleCancelEdit} />
          </form>  
        <br/>
        <br/>
       
    <h3>Tabel Karyawan </h3>
    
        <table border={6} className="tbl">
            <thead>
                <tr>
                  <td><b>Nik</b></td> 
                <td><b>Nama</b></td>
                <td><b>Foto</b></td>
                <td><b>Tanggal Masuk</b></td>
                <td><b>Tanggal Keluar</b></td>
                <td><b>Alamat</b></td>
                <td colSpan={2}><b>Action</b></td>
                </tr>
            </thead>
            <tbody>
            {karyawan.map((kry) => 
                <tr>
                    <td>{kry.nik}</td>
                    <td>{kry.nama}</td>
                    <td><img src={kry.foto} width="80"/></td>
                    <td>{kry.tanggal_masuk}</td>
                    <td>{kry.tanggal_keluar}</td>
                    <td>{kry.alamat}</td>
                   <td><button onClick={handleEdit} value={kry.nik}>edit</button></td>
                   <td><button onClick={handleDelete} value={kry.nik}>delete</button></td>
                </tr>
           )}     
                   </tbody>
          </table>
         
          </div>
          </div>
          </center>
        )
}
  
  }