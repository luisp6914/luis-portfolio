import { Route, Routes } from 'react-router-dom'
import Navbar from './common/Navbar'
import Footer from './common/Footer'
import HomePage from './Home/components/HomePage'
import Portal from './covidProject/components/Portal'
import HealthRecords from './covidProject/components/HealthRecords'
import Categories from './digiKeyProject/components/DigiContent'
import UserPicks from './partPickerProject/components/UserPicks'
import CpuOptions from './partPickerProject/components/CpuOptions'
import MotherboardOptions from './partPickerProject/components/MotherboardOptions'
import MemoryOptions from './partPickerProject/components/MemroyOptions'
import StorageOptions from './partPickerProject/components/StorageOptions'
import GpuOptions from './partPickerProject/components/GpuOptions'
import CaseOptions from './partPickerProject/components/CaseOptions'
import PsuOptions from './partPickerProject/components/PsuOptions'
import MonitorOptions from './partPickerProject/components/MonitorOptions'


function App() {
  return (
    <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
      <Navbar></Navbar>

      <div style={{flexGrow: 1}}>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/home' element={<HomePage/>} />
          <Route path='/about' element={<HomePage/>} />
          <Route path='/projects' element={<HomePage/>} />
          <Route path='/contact' element={<HomePage/>} />

          <Route path='/covid-project' element={<Portal/>} />
          <Route path='/covid-project/patients' element={<HealthRecords/>} />
          <Route path='/covid-project/vaccines' element={<HealthRecords/>} />

          <Route path='/digikey-api' element={<Categories/>} />
          
          <Route path='/pcpartpicker' element={<UserPicks/>}></Route>
          <Route path='/pcpartpicker/cpu' element={<CpuOptions/>}></Route>
          <Route path='/pcpartpicker/motherboard' element={<MotherboardOptions/>}></Route>
          <Route path='/pcpartpicker/memory' element={<MemoryOptions/>}></Route>
          <Route path='/pcpartpicker/storage' element={<StorageOptions/>}></Route>
          <Route path='/pcpartpicker/gpu' element={<GpuOptions/>}></Route>
          <Route path='/pcpartpicker/case' element={<CaseOptions/>}></Route>
          <Route path='/pcpartpicker/psu' element={<PsuOptions/>}></Route>
          <Route path='/pcpartpicker/monitor' element={<MonitorOptions/>}></Route>
        </Routes>
      </div>

      <Footer></Footer>
    </div>
  )
}

export default App
